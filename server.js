require('dotenv').config();
const express = require('express');
const next = require('next');
const fs = require('fs');
const fm = require('front-matter');
const getSlug = require('speakingurl');
const getMembersCount = require('./bot');


const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

let state = {
	posts: []
};

getMembersCount(process.env.BOT_TOKEN)
	.then(groups => state.groups = groups)
	.catch(err => console.log(err));

setInterval(async () => {
	state.groups = await getMembersCount(process.env.BOT_TOKEN);
}, 1000 * 60 * 60);

fs.readdir('./posts', 'utf8', (err, files) => {
	if (err) throw err;
	files.forEach(file => {
		fs.readFile(`./posts/${file}`, 'utf8', (err, data) => {
			state.posts.push(fm(data));
		});
	});
});

app.prepare()
	.then(() => {
		const server = express();
		server.use('/static', express.static('static'));
		server.get('/', (req, res) => {
			return app.render(req, res, '/', state.groups);
		});
		server.get('/blog/', (req, res) => {
			return app.render(req, res, '/blog', state.posts);
		});
		server.get('*', (req, res) => {
			return handle(req, res);
		});
		server.listen(8168, (err) => {
			if (err) throw err;
			console.log('> Ready on http://localhost:8168');
		});
	});
