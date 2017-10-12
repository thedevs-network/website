import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { getContext, setContext } from '../styles/context';
import stylesheet from '../static/css/main.scss';
import minifyCSSString from 'minify-css-string';

const customStyles = minifyCSSString(stylesheet);

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
					<title>The Devs, Developers Community on Telegram</title>
					<meta charSet='utf-8' />
					<meta name='viewport' content={
						'user-scalable=0, initial-scale=1, maximum-scale=1, ' +
						'minimum-scale=1, width=device-width, height=device-height'}
					/>
					<meta name="theme-color" content="#512DA8" />
					<link rel="icon" type="image/png" sizes="16x16" href="/static/img/favicon-16x16.png" />
					<link rel="icon" type="image/png" sizes="32x32" href="/static/img/favicon-32x32.png" />
					<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500' />
				</Head>
				<body>
					<style dangerouslySetInnerHTML={{ __html: customStyles }} />
					<Main />
					<NextScript />
					<script src="/static/js/prism.js"></script>
				</body>
			</html>
		)
	}
}