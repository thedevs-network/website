import React from 'react';
import withRoot from '../components/withRoot';
import BlogPost from '../components/Post';

const index = (props) => (
  <BlogPost {...props} />
);

index.getInitialProps = async ({ query }) => {
  return { post: query }
}

export default withRoot(index);