import React from 'react';
import withRoot from '../components/withRoot';

import Blog from '../components/Blog';

const index = () => (
  <Blog />
);

export default withRoot(Blog);