import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { getContext, setContext } from '../styles/context';

export default class MyDocument extends Document {
	static async getInitialProps(ctx) {
		setContext();
		const page = ctx.renderPage();
		const context = getContext();
		return {
			...page,
			styles: <style id='jss-server-side' dangerouslySetInnerHTML={{ __html: context.sheetsRegistry.toString() }} />
		}
	}

	render() {
		const context = getContext();
		return (
			<html lang='en'>
				<Head>
					<title>My page</title>
					<meta charSet='utf-8' />
					<meta name='viewport'content={
							'user-scalable=0, initial-scale=1, maximum-scale=1, ' +
							'minimum-scale=1, width=device-width, height=device-height'}
					/>
					<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500' />
					<link rel="stylesheet" href="/static/css/normalize.css" />
					<link rel="stylesheet" href="/static/css/flexboxgrid.min.css" />
					<link rel="stylesheet" href="/static/css/main.css" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</html>
		)
	}
}