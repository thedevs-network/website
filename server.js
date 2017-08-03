require('dotenv').config();
const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const getMembersCount = require('./bot');

let state = {};

getMembersCount(process.env.BOT_TOKEN)
	.then(groups => state.groups = groups)
	.catch(err => console.log(err));

setInterval(async () => {
	state.groups = await getMembersCount(process.env.BOT_TOKEN);
}, 1000 * 60 * 60)

app.prepare()
	.then(() => {
		const server = express();
		server.use('/static', express.static('static'));
		server.get('/', (req, res) => {
			return app.render(req, res, '/', state.groups);
		});
		server.get('*', (req, res) => {
			return handle(req, res);
		});
		server.listen(8168, (err) => {
			if (err) throw err;
			console.log('> Ready on http://localhost:3000');
		});
	})
