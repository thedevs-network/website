import React from 'react';
import Header from './Header';
import TopBar from './TopBar';
import Content from './Content';
import Footer from '../Footer';

const BlogPost = ({ post }) => {
  return (
    <div>
      <Header />
      <TopBar />
      <Content post={post} />
      <Footer />
    </div>
  );
};

export default BlogPost;