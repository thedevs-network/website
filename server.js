require('dotenv').config();
const fs = require('fs');
const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const fm = require('front-matter');
const moment = require('moment');
const getSlug = require('speakingurl');
const axios = require('axios');
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
			let post = fm(data);
			let date = post.attributes.date.split(', ');
			date[1] = date[1] - 1;
			date = moment(date)
			post.attributes.date = date;
			post.attributes.displayDate = date.format('MMM D')
			state.posts.push(post);
			if (state.posts.length === files.length) {
				state.posts.sort((a, b) => b.attributes.date - a.attributes.date);
			}
		});
	});
});

const subscribe = (email) => {
	const list = process.env.MAILCHIMP_LIST;
	const token = process.env.MAILCHIMP_TOKEN;
	return new Promise((resolve, reject) => {
		if (!email) {
			reject('No email address has provided');
		}
		if (!list || !token) {
			reject('API has not been provided.')
		}
		axios({
			method: 'post',
			url: `https://us16.api.mailchimp.com/3.0/lists/${list}/members/`,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Basic ${token}`,
			},
			data: {
				email_address: email,
				status: 'subscribed',
			},
		})
			.then(res => resolve(res))
			.catch(err => reject(err))
	});
}

app.prepare()
	.then(() => {
		const server = express();

		server.use(bodyParser.urlencoded({
			extended: true
		}));

		server.use(bodyParser.json());

		server.use('/static', express.static('static'));
		server.use('/.well-known', express.static('.well-known'));

		server.get('/', (req, res) => {
			return app.render(req, res, '/', state.groups);
		});

		server.get('/blog/', (req, res) => {
			return app.render(req, res, '/blog', state.posts);
		});

		server.get('/blog/:post', (req, res) => {
			const post = state.posts.filter(item =>
				getSlug(item.attributes.title) === getSlug(req.params.post)
			);
			if (post.length < 1) return res.redirect('/404');
			return app.render(req, res, '/post', ...post);
		});

		server.post('/subscription', (req, res) => {
			subscribe(req.body.email)
				.then(response => res.status(200).send('subsribed!'))
				.catch(err => res.status(400).send({message: err}));
		});

		server.get('/mailto/:mail', (req, res) => {
			const { mail } = req.params;
			res.redirect(`mailto:${mail}`);
		});

		server.get('*', (req, res) => {
			return handle(req, res);
		});

		server.listen(8168, (err) => {
			if (err) throw err;
			console.log('> Ready on http://localhost:8168');
		});
	});
