import React from 'react';
import Head from 'next/head';
import withRoot from '../components/withRoot';
import Blog from '../components/Blog';

const index = ({ posts, cats }) => (
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
    <Blog posts={posts} cats={cats} />
  </div>
);

index.getInitialProps = async ({ req, query }) => {
  let posts = query;

  const cats = posts.reduce((a, b) => {
    let allcats = [...a];
    const newcats = b.attributes.cats.split(', ');
    newcats.forEach(cat => {
      if (allcats.indexOf(cat) < 0) {
        allcats.push(cat);
      }
    });
    return allcats;
  }, []);

  if (req.query) {
    if (req.query.cat)
      posts = posts.filter(post => 
        post.attributes.cats.split(', ').indexOf(req.query.cat) >= 0
      )
    if (req.query.tag)
      posts = posts.filter(post => 
        post.attributes.tags.split(', ').indexOf(req.query.tag) >= 0
      )
  }

  return { posts, cats };
}

export default withRoot(index);