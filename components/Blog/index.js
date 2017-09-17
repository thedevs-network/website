import React from 'react';
import Header from './Header';
import Posts from './Posts';
import Subscription from '../Subscription';

const Blog = ({ posts, cats }) => (
  <div>
    <Header cats={cats} />
    <Posts posts={posts} />
    <Subscription />
  </div>
);

export default Blog;