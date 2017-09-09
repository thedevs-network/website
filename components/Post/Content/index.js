import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import getSlug from 'speakingurl';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Chip from 'material-ui/Chip';
import ReactMarkdown from 'react-markdown';
import Share from '../Share';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: -theme.spacing.unit * 40,
    paddingBottom: "2.5em"
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
    marginTop: theme.spacing.unit * 10
  },
  '@media screen and (max-width: 1120px)': {
    root: {
      marginTop: -theme.spacing.unit * 20
    },
    container: {
      width: '100%',
      flexBasis: '100%'
    },
    image: {
      width: '92vw',
      height: '51.75vw'
    },
    body: {
      width: '100%',
      padding: '0 .2em',
      marginTop: theme.spacing.unit * 8
    }
  }
});

const showTags = (tag, index) => (
  <Chip key={index} label={tag} style={{ margin: '1em .5em' }} />
);

const Content = ({ classes, post }) => (
  <div>
    <Head>
      <title>{post.attributes.title}</title>
      <meta name="twitter:title" content={post.attributes.title} />
      <meta name="twitter:description" content="The Devs" />
      <meta name="twitter:image" content={`https://thedevs.network/static/img/posts/${post.attributes.img}.jpg`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@thedevsnetwork" />
      <meta name="twitter:creator" content="@poeti8" />

      <meta property="og:title" content={post.attributes.title} />
      <meta property="og:url" content={`https://thedevs.network/blog/${getSlug(post.attributes.title)}`} />
      <meta property="og:image" content={`https://thedevs.network/static/img/posts/${post.attributes.img}.jpg`} />
      <meta property="og:description" content="The Devs" />
    </Head>
    <div className={classes.root + " row center-xs"}>
      <div className={classes.container + " row center-xs"}>
        <article className="row col-xs-12 center-xs">
          <img
            src={`/static/img/posts/${post.attributes.img}.jpg`}
            alt={post.attributes.title}
            className={classes.image}
          />
          <Typography color="default" type="display2" component="h1" className="post-title">
            {post.attributes.title}
          </Typography>
          <div className={classes.body + " row start-xs post-body"}>
            <ReactMarkdown source={post.body} />
            <Share title={getSlug(post.attributes.title)} />
            <a href="/" style={{ fontStyle: "italic", fontSize: "2em", textAlign: "center", margin: "1.8em auto 1em" }}>
              Join Developers Community on Telegram!
            </a>
          </div>
        </article>
      </div>
    </div>
  </div>
);

Content.PropTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Content);