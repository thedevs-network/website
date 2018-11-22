import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import JssProvider from 'react-jss/lib/JssProvider';
import getContext from '../styles/getContext';
import stylesheet from '../static/css/main.scss';
import minifyCSSString from 'minify-css-string';
import config from '../config.json'

const customStyles = minifyCSSString(stylesheet);

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const context = getContext();
    const page = ctx.renderPage(Component => props => (
      <JssProvider registry={context.sheetsRegistry} jss={context.jss}>
        <Component {...props} />
      </JssProvider>
    ));

    return {
      ...page,
      stylesContext: context,
      styles: (
        <style
          id="jss-server-side"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: context.sheetsRegistry.toString(),
          }}
        />
      ),
    };
  }

  render() {
    const context = getContext();
    return (
      <html lang="en">
        <Head>
          <meta
            name="viewport"
            content={
              'user-scalable=0, initial-scale=1, maximum-scale=1, ' +
              'minimum-scale=1, width=device-width, height=device-height'
            }
          />
          <meta
            name="google-site-verification"
            content={config.googleVerificationContent}
          />
          <meta name="description" content="The Devs Network, developers community with +20 programming groups on Telegram" />
          <meta name="image" content="https://thedevs.network/static/img/thedevs.png" />
          <meta itemprop="name" content="https://thedevs.network/" />
          <meta itemprop="description" content="The Devs Network, developers community with +20 programming groups on Telegram" />
          <meta itemprop="image" content="https://thedevs.network/static/img/thedevs.png" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content="https://thedevs.network/" />
          <meta name="twitter:description" content="The Devs Network, developers community with +20 programming groups on Telegram" />
          <meta name="twitter:image:src" content="https://thedevs.network/static/img/twitter-card.png" />
          <meta name="og:title" content="https://thedevs.network/" />
          <meta name="og:description" content="The Devs Network, developers community with +20 programming groups on Telegram" />
          <meta name="og:image" content="https://thedevs.network/static/img/og-card.png" />
          <meta name="og:url" content="https://thedevs.network" />
          <meta name="og:site_name" content="The Devs" />
          <meta name="og:type" content="website" />
          <meta name="theme-color" content="#512DA8" />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/img/favicon-16x16.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/img/favicon-32x32.png"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />
          <style dangerouslySetInnerHTML={{ __html: customStyles }} />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script src="/static/js/analytics.js" />
          <script src="/static/js/prism.js" />
        </body>
      </html>
    );
  }
}
