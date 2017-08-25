import React, { Component } from 'react';
import Head from 'next/head';
import withRoot from '../components/withRoot';
import Header from '../components/Header';
import Community from '../components/Community';
import Footer from '../components/Footer';

class Index extends Component {
	render() {
		return (
			<div>
				<Head>
					<title>The Devs, Developers Community on Telegram.</title>
					<meta name="twitter:title" content="The Devs" />
					<meta name="twitter:description" content="Developers Community on Telegram." />
					<meta name="twitter:image" content="/static/img/thedevs.png" />
					<meta property="og:title" content="The Devs" />
					<meta property="og:url" content="https://thedevs.network/" />
					<meta property="og:image" content="/static/img/thedevs.png" />
					<meta property="og:description" content="Developers Community on Telegram." />
				</Head>
				<Header />
				<Community groups={this.props.url.query} />
				<Footer />
			</div>
		);
	}
}

export default withRoot(Index);
