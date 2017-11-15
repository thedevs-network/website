---
title: What is Functional Programming?
img: what-is-functional-programming
date: 2017, 11, 14
author: Thomas Rory Gummerson
cats: javascript
tags: javascript, functional, programming
---
Functional Programming (often abbreviated FP) is a very strict programming style that enforces a certain set of strict principles about what you're allowed and not allowed to do in your code. Functional programming languages enforce these principles automatically by design, but it's possible (and often very practical) to write functional code in most programming languages.

## Sidebar: JavaScript

JavaScript is like many others a multi-paradigm language. This means that you can write code in many different ways in JavaScript, and it will adapt to your needs by providing you with useful constructs and APIs for your preferred style. You can even switch your code style mid-file, and libraries written in different styles can work with each other. This enables programmers coming from many different backgrounds to pick up their preferred style while still being able to work together.

All of the code examples in this article will be in [JavaScript](https://en.wikipedia.org/wiki/JavaScript).

## Why?

Why would you want to write functional code? You should know the answer to this question before attempting to program in a functional style.

The best reason I can think of is that any program written in a functional style becomes much easier to debug and to change. The reason for this sudden ease of change is something called Pure Functions. We'll come back to this later on this post.

Another major selling point for functional code is modularity. ANY function defined in your code (As long as you write only pure functions) is completely detachable and reusable throughout your project, or even in other projects (You can turn it into a module!). With imperative programming it's rarely easy or even possible to pull arbitrary functions out of the codebase and reuse them elsewhere.

As well as all of this, functional code is generally very easy to express, and even more importantly, express concisely. This is an added bonus of both pure functions and the simplicity offered by functional code style.

## How?

I know you're anxious, so in these next few segments I'll include code samples to help me illustrate my points.

To write functional code in a multi-paradigm language is to restrict yourself. It is to avoid code that you'll recognize as harmful, because it doesn't follow the functional rules. The point of excluding these things from your code is to prevent it from being possible to make mistakes in your code. If your code is pure functional, the only mistakes you make will be logical algorithmic mistakes, never based on wrong assumptions about state, time, or low-level things like that that we shouldn't really have to worry about in our abstract world.

### Reassignment

A BIG problem with imperative code is assignment, or specifically REassignment. The fact that a variable can represent different values at different times introduces an enormous amount of complexity into your code. What will the value of x be when it goes in this function? What about after? Will it always be that value? In which cases does it change? We're programmers, we can do better. We should try to avoid all these questions. The way this is done in FP is by saying that reassignment is illegal. And it will not happen within purely functional code. This may sound confusing if you're used to an imperative style of writing code, how will you ever be able to keep state? To have your program behave differently at different times. The answer to this (the same as the answer to many things in FP;) is in most cases recursion or simply passing conditional arguments into functions.

A naive trap that inexperienced programmers often fall into is reusing variables for many different things throughout a function or a file. A good example of this is when dealing with some kind of cache:

```js
let user = cache[id];
if (!user) {
    user = db.getUser(id);
}
Promise.resolve(user)
    .then(console.log);
```

This assumes that a user may or may not be in a cache, however, thinking in a pure functional way, we want to avoid reassignment completely, so we should somehow try to push the logic of the if statement into the creation of the user variable. Luckily there are operators to help us with this (Ternary (`?:`), and boolean operators `&&` and `||`). All we need in this case is `||` (pronounced "or"):

```js
const user = cache[id] || db.getUser(id);
Promise.resolve(user)
    .then(console.log);
```

It's also possible to avoid creating a variable at all, since it's only used once in this example. This makes for even shorter code, but sometimes you'll want to explicitly tell the reader of your code what a variable is. This is how it would look without declaring anything:

```js
Promise.resolve(cache[id] || db.getUser(id))
    .then(console.log);
```

It's up to you to decide when it makes sense to create variables. A good rule of thumb is that if something is used in more than one place, it should be a variable.

This avoids ANY reassignment and also makes the code much more concise and readable. This is also an example of using conditional arguments rather than reassignment. What gets passed to Promise.resolve may be one of two things.

### Mutation

Mutation is also a problem. You should never mutate data. Instead, create new data from the original, with a few changes. Any change should make a copy to the data. The reason for this is that the same questions about time and state apply to objects and lists as well as variables. Here you'll run into one of the limitations of JS though, the data structures in JS are pretty much built for mutation, and they are not very efficient when you create copies all the time. However, libraries exist! Immutable.js by Facebook is a great library for this, and it has support for almost ALL common datastructures, as well as a super-easy API. I'll show you some examples using this too.

An obvious example is if you're writing a function that accepts an object as an argument, and want to return another object. This is the naive way to achieve this:

```js
function addName(user) {
    const name = db.getName(user.id);
    user.name = name;
    return user;
}
```

Doing this however, will break code that uses your function like so:

```js
const myUser = db.getUser(id);
const userWithName = addName(myUser);
doOtherThing(myUser);
```

The caller may not expect `myUser` to have changed, and think they are passing their original object to `doOtherThing`. This is bad, and leads to a lot of confusing bugs. The correct way to solve this is to NOT change the object, but create a new one! Object creation is cheap in JavaScript, so this won't impact performance very much:

```js
function addName(user) {
    const name = db.getName(user.id);
    const result = {};
    Object.assign(result, user, { name });
    return result;
}
```

This can be further shortened to the following, since Object.assign returns the first argument (the target object):

```js
function addName(user) {
    return Oject.assign({}, user, {
        name: db.getName(user.id)
    });
}
```

If you're using fancy new syntax you can even do this:

```js
function addName(user) {
    return {
        ...user,
        name: db.getName(user.id)
    };
}
```

Isn't that clear and readable? It also won't lead to any confusion since it won't break anything by mutating the callers' object.

### Pure functions

Pure functions are ALL you really need in FP. Sure, you can create complex types, you can do a lot of magic, but FP is really all about composing functions, that is; making functions work with eachother and everything else.

"Pure" really means that the function doesn't contain any other data than the arguments to it, or it's local scope. Any function that uses ANY global mutable / reassignable variable or relies on any local mutable / reassignable variable is NOT pure. A pure function ONLY accepts input and returns output.

A non-pure function looks like this:

```js
const userList = [];

function addUser(user) {
    userList.push(user);
    return "Added user";
}
```

This is because when called it will reach outside of itself and CHANGE something that is not part of it. In other words, it has a side-effect, a bug. A pure function is self-contained, ALL data is passed as arguments. To do the above in a pure functional way, we would do:

```js
const userList = [];

function addUser(user) {
    return [
        ...userList,
        user
    ];
}
```

This naturally requires some API-changes, since it means a new userList is created for each call. Instead of this, a non-pure (but still functional) way is acceptable IF you really want to. Just be aware of the state in your applications:

```js
const userList = [];

function addUser(list, user) {
    list.push(user);
    return "Added user";
}
```

You can also curry this function to bring back the original API as the first example:

```js

const userList = [];

function createUserAdder(list) {
    return function addUser(user) {
        list.push(user);
        return "Added user";
    }
}

const addUser = createUserAdder(userList);
```

This may seem overly explicit and long, but it comes in handy alot for when you want to reuse code.

### OOP

Many people think that OOP is the opposite of functional programming. It is NOT. OOP can be used in perfect conjunction with FP, and they work very well together. This is because OOP is not really a paradigm. I'll show you an example of some classic object-oriented code, then I'll show you an example of how we can implement the same functionality in a pure-functional way.

```js
function makeCounter() {
    var count = 0;
    return {
        incr: function () { return ++count; },
        decr: function () { return --count; }
    };
}
```

This will implement a simple class that creates counters, has a private variable `count`, and instance methods `incr` and `decr`. To make this pure functional is simple:

```js
function makeCounter(n) {
    var count = n || 0;
    return {
        incr: function () { return makeCounter(count + 1); },
        decr: function () { return makeCounter(count - 1); },
        get: function () { return count; }
    };
}
```

As you can see, we're doing NO mutation or reassignment, BUT we're still working with classes, methods, and private variables. Interestingly, this piece of code almost fits the description of a monad, which is a very interesting, but pretty advanced functional concept.

### IO and FS

Interestingly, pure functional programming doesn't allow for non-mathematical concepts that exist in the real world. Examples of these are randomness, the current date, files on a filesystem, basically anything that changes. Obviously `fs.readFile('myfile.txt')` can never be a pure function, since it interacts with some external resource. In pure functional languages, we use monads to overcome these problems. Monads "lift" our functions so that they don't get called directly in the code, thus not violating any rules. You've already seen monads before, because a regular Promise in JavaScript IS actually a monad! My suggestion for dealing with external forces in JavaScript is to do one of the following things:

1. Wrap all your external-speaking code in monads, that way you won't break the purity of your program.
1. Just avoid doing pure functional in those few places and be very aware of their locations, they are a source of potential bugs!

## What is gained?

Alright, so why should we restrict ourselves in all these ways for the sake of functional programs?

### Performance

There's an interesting trend that has been happening in processor development over the last few years, and that trend is the fact that clock speed has gradually stopped increasing!

The reason for this is that we simply can't figure out how to make the processors smaller (The only way we have been increasing speeds over the years is by reducing the distance electricity in the processor has to travel).

BUT we have figured out a semi-viable solution to this. We can simply put more processors (cores) in a CPU. That way we can increase performance without having to figure out how to make things even smaller.

Here's the kicker: Pure functional code is naturally parallelizable, imperative code isn't.

Code that relies on changing variables does not work if you try to run it across multiple cores. FP avoids this problem entirely. Sure, by copying datastructures we may need more memory, but guess what? Memory is cheap. And we have ALOT of memory.

### Safety in functions

Another benefit is the fact that functions are completely safe and reliable.

You can always rely on a function working as expected once you've made it work once.

### Removal of (global) state

Global state also dissappears in functional code. There is nothing that has to happen in order, because nothing in your program will change over time.

## Conclusion

I hope you have gotten a new outlook on the benefits of functional programming.

The reason functional programming hasn't been popularized until recently is that OOP was marketed SO well in the 90's as THE correct paradigm. I believe that is not actually the case. Imperative, procedural, and OOP code will not scale well on future hardware platforms, and is harder to reason about than pure functional code.

Functional programming will also help you become a better programmer, by requiring you to think harder about your application design decisions.