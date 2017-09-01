import React from 'react';
import Header from './Header';
import Posts from './Posts';

const Blog = ({ posts, cats }) => (
  <div>
    <Header cats={cats} />
    <Posts posts={posts} />
  </div>
);

export default Blog;