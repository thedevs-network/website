---
title: Build a simple Telegram Bot with Node.js
img: simple-telegram-bot-nodejs
date: 2017, 08, 25
author: Pouria Ezzati
cats: javascript
tags: javascript, telegram, bot, node
---

Ever since Telegram introduced bots in 2015, other messengers have added bots to their own platforms. But Telegram's extensive bot API and the freedom it offers the developer keep it at an edge ahead of its competitors.

Lately, businesses have begun to adopt Telegram's bot platform to build completely separate apps that can do virtually anything within the bot framework.

## How bots work

In order to be able to get updates from Telegram, you need a **token**. All the updates and the interactions with your bot gets stored in Telegram and you can get them by sending a request to this URL with that token. 

```javascript
https://api.telegram.org/bot<token>/METHOD_NAME  
```

> The Bot API is an HTTP-based interface created for developers keen on building bots for Telegram.

## Getting started

First of all, go ahead and create your bot with [BotFather](https://telegram.me/botfather) - which is a bot by itself. Now you have the token and can get updates from Telegram. Let's get some info from Telegram so we can make sure our bot works.

Replace the URL above with your token and a method from [Telegram's Bot API](https://core.telegram.org/bots/api). Let's use **getMe** method.

```javascript
https://api.telegram.org/bot<token>/getMe

// --> {"ok":true,"result":{"id":437852999,"is_bot":true,"first_name":"Reddit Bot","username":"SimpleReddit_Bot"}}
```

Well done. But how do we do this in NodeJS? It's basically the same. Every time we need an update we send a request to that URL with our desired method.

But the whole process of doing this would be frustrating, so we have handy frameworks for this. They handle everything and let us focus on what's important. There are some good frameworks [available for NodeJS](https://core.telegram.org/bots/samples), in this tutorial we're going to use [Telegraf](https://github.com/telegraf/telegraf).

## Start coding

Initialize the project and install **Telegraf**:

```javascript
npm init
```
```javascript
npm install telegraf --save  
```

Now let's add it to our script and make a simple bot:

```javascript
const Telegraf = require('telegraf');
const app = new Telegraf(YOUR_TOKEN_HERE);

app.hears('hi', ctx => {
  return ctx.reply('Hey!');
});

app.startPolling();
```

What's going on? Telegraf has it's own methods to handle most of the work for us. We can use this method to respond to a user's message:

![nodejs-reddit-bot-1](/static/img/posts/build-a-telegram-bot-with-node.js/nodejs-reddit-bot-1.gif "nodejs-reddit-bot-1")

## Reddit bot
Let's take an example. We're going to send the top post of the subreddit that a user asks for. Install [axios](https://github.com/mzabriskie/axios) library to simplify sending **GET** requests and grabbing data from [Reddit](https://www.reddit.com/dev/api/).

```javascript
npm install axios --save
```
```javascript
const axios = require('axios'); // add axios

// handle the reaction everytime user sends a text message
app.on('text', ctx => {

  // ctx object holds the Update object from Telegram API
  // So you can use everything you see there

  // get the text message sent by user
  const subreddit = ctx.message.text;

  // GET the data from Reddit API
  axios.get(`https://reddit.com/r/${subreddit}/top.json?limit=10`)
    .then(res => {

      // data recieved from Reddit
      const data = res.data.data;

      // if subbreddit does not exist
      if (data.children.length < 1) 
        return ctx.reply('The subreddit couldn\'t be found.');

      // send the first top post link to the user
      const link = `https://reddit.com/${data.children[0].data.permalink}`;
      return ctx.reply(link);
    })

    // if there's any error in request
    .catch(err => console.log(err));
});
```
![nodejs-reddit-bot-2](/static/img/posts/build-a-telegram-bot-with-node.js/nodejs-reddit-bot-2.gif "nodejs-reddit-bot-2")

When a user sends a subreddit name, we're going to grab the top post of that subreddit and send its link to them. Simple, huh?

## Saving state
Imagine users want other options such as top, hot and new. We need to store the latest command they used to be able to respond correctly. Note that we use **command** method instead of **on**.

You can create commands on a Telegram bot. Commands start with **'/'** and are clickable. To add commands to your bot, message [BotFather](https://telegram.me/botfather).

```javascript
let state = {};

app.command('top', ctx => {
  const userId = ctx.message.from.id;

  // if user id does not exist create one  
  if (!state[userId])
    state[userId] = { id: userId };

  // save/update user last command    
  state[userId].command = 'top';
  return ctx.replyWithMarkdown(`Enter a subreddit name to get *top* posts.`);
});

app.command('hot', ctx => {
  const userId = ctx.message.from.id;
  if (!state[userId])
    state[userId] = { id: userId };
  state[userId].command = 'hot';
  return ctx.replyWithMarkdown('Enter a subreddit name to get *hot* posts.');
});
```

Now we can send the proper post based on filter. In our **text** response:

```javascript
const userId = ctx.message.from.id;
// check if state and command exists and set defaults
const type = !state[userId] ? 
    'top' : 
    state[userId].command ? 
      state[userId].command : 
      'top';
axios.get(`https://reddit.com/r/${subreddit}/${type}.json?limit=10`)
  .then(res => [
    // do stuff
  ])
```

![nodejs-reddit-bot-3](/static/img/posts/build-a-telegram-bot-with-node.js/nodejs-reddit-bot-3.gif "nodejs-reddit-bot-3")

## Inline buttons
Telegram bots have interactive buttons called **InlineKeyboardMarkup**.  We're going to add a **next** button, so the user can get the next post in that category.

We need to extract the specific methods for buttons from Telegraf in order to work with them:

```javascript
const { Markup } = require('telegraf');
```

First, let's add the current post number to the state. Every time a user asks for a subreddit we need to set index to 0. In our **text** method:

```javascript
  if (!state[userId])
    state[userId] = {};
  state[userId].index = 0;
```

Instead of sending plain text, we send it with an inline button in the **axios response**:

```javascript
// old response, only text
return ctx.reply(link);

// new response, with inline buttons
return ctx.reply(link, 
	Markup.inlineKeyboard([
		// first argument is button's text
		// second argument is callback text
		Markup.callbackButton('➡️ Next', subreddit),
	]).extra()
);
```
We can handle the callback with **on** method, but this time, the update method is **callback_query**:

```javascript
app.on('callback_query', ctx => {
	// get info from callback_query object
  const subreddit = ctx.update.callback_query.data;
  const userId = ctx.update.callback_query.from.id;

	// check if user state and its properties exist
  let type;
  let index;
  try {
    type = state[userId].command ? state[userId].command : 'top';
    index = state[userId].index;
  } catch (err) {
    return ctx.reply('Send a subreddit name.');
  }

	// reply with a popup to callback
  ctx.answerCallbackQuery('Wait...');

  axios.get(`https://reddit.com/r/${subreddit}/${type}.json?limit=10`)
    .then(res => {
      const data = res.data.data;

			// check if next one exists
      if (!data.children[index + 1])
        return ctx.reply('No more posts!');
      
			// send next link and update the user state with new index
      const link = `https://reddit.com/${data.children[index + 1].data.permalink}`;
      state[userId].index = state[userId].index + 1;
      return ctx.reply(link, 
        Markup.inlineKeyboard([
          Markup.callbackButton('➡️ Next', subreddit),
        ]).extra()
      );
    })
    .catch(err => console.log(err));
});
```
![nodejs-reddit-bot-4](/static/img/posts/build-a-telegram-bot-with-node.js/nodejs-reddit-bot-4.gif "nodejs-reddit-bot-4")

## Wrapping up
As you can see, we've created a simple Telegram bot in minutes. Creating bots in Telegram easy, but it doesn't stop here. There are a lot of more stuff you can do with them—such as sending photos, videos, documents etc.

Imagine all the things you can do with Telegram's huge API which continuously gets better with each update.

You can find the source code of this bot on [GitHub](https://github.com/poeti8/simple-reddit-bot). [Here is a more complex Reddit bot](https://github.com/poeti8/reddbot) I've created, which uses more bot features such as sending photos and inline buttons.