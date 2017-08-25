import React from 'react';
import Head from 'next/head';
import withRoot from '../components/withRoot';
import Blog from '../components/Blog';

const index = ({ posts }) => (
  <div>
    <Head>
      <title>The Devs Blog, Developers Community on Telegram.</title>
      <meta name="twitter:title" content="The Devs Blog" />
      <meta name="twitter:description" content="Developers Community on Telegram." />
      <meta name="twitter:image" content="/static/img/thedevs.png" />
      <meta property="og:title" content="The Devs Blog" />
      <meta property="og:url" content="https://thedevs.network/blog" />
      <meta property="og:image" content="/static/img/thedevs.png" />
      <meta property="og:description" content="Developers Community on Telegram." />
    </Head>
    <Blog posts={posts} />
  </div>
);

index.getInitialProps = async ({ query }) => {
  return { posts: query };
}

export default withRoot(index);