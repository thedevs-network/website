import React from 'react';

import Header from './Header';
import Posts from './Posts';

const Blog = (props) => {
  console.log(props.url.query)
  return (
    <div>
      <Header />
      <Posts posts={props.url.query} />
    </div>
  );
};

export default Blog;