import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import getSlug from 'speakingurl';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Chip from 'material-ui/Chip';
import ReactMarkdown from 'react-markdown';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: -theme.spacing.unit * 40,
    marginBottom: '6em'
  },
  container: {
    width: 1120,
    flexBasis: 1120
  },
  image: {
    width: 800,
    height: 450,
    marginBottom: theme.spacing.unit * 8,
    boxShadow: theme.shadows[16]
  },
  body: {
    width: 672,
    marginTop: theme.spacing.unit * 12
  }
});

const showTags = (tag, index) => (
  <Chip key={index} label={tag} style={{margin: '1em .5em'}}/>
);

const Content = ({ classes, post }) => (
  <div>
    <Head>
      <meta name="twitter:title" content="The Devs" />
      <meta name="twitter:description" content={post.attributes.title} />
      <meta name="twitter:image" content={`https://thedevs.network/static/img/posts/${post.attributes.img}.jpg`} />
      <meta property="og:title" content="The Devs" />
      <meta property="og:url" content={`https://thedevs.network/blog/${getSlug(post.attributes.title)}`} />
      <meta property="og:image" content={`https://thedevs.network/static/img/posts/${post.attributes.img}.jpg`} />
      <meta property="og:description" content={post.attributes.title} />
    </Head>
    <div className={classes.root + " row center-xs"}>
      <div className={classes.container + " row center-xs"}> 
        <article className="row col-xs-12 center-xs">
          <img 
            src={`/static/img/posts/${post.attributes.img}.jpg`} 
            alt={post.attributes.title}
            className={classes.image}
          />
          <Typography color="default" type="display2" component="h1">
            {post.attributes.title}
          </Typography>
          <ReactMarkdown source={post.body} className={classes.body + " row start-xs post-body"} />
        </article>
      </div>
    </div>
  </div>
);

Content.PropTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Content);