import React from 'react';
import Header from './Header';
import Posts from './Posts';

const Blog = ({posts}) => {
  const tags = posts.reduce((a, b) => {
    let allTags = [...a];
    const newTags = b.attributes.tags.split(', ');
    newTags.forEach(tag => {
      if (allTags.indexOf(tag) < 0) {
        allTags.push(tag);
      }
    });
    return allTags;
  }, []);

  return (
    <div>
      <Header tags={tags} />
      <Posts posts={posts} />
    </div>
  );
};

export default Blog;