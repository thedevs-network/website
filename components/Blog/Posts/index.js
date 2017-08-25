import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

import Post from './Post';

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing.unit * 11,
    paddingBottom: theme.spacing.unit * 11,
    backgroundColor: theme.palette.shades.light.background.default,
    color: '#f5f5f5',
    marginTop: 8
  },
  container: {
    width: 1120,
    flexBasis: 1120
  }
});

const showPosts = (post, index) => (
  <Post key={index} post={post} />
);

const Posts = ({ classes, posts }) => (
  <div className={classes.root + " row center-xs"}>
    <div className={classes.container + " row start-xs"}>
      {posts.map(showPosts)}
    </div>
  </div>
);

Posts.PropTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Posts);