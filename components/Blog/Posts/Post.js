import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import getSlug from 'speakingurl';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

const styles = theme => ({
  card: {
    padding: 0,
    marginBottom: theme.spacing.unit * 4,
    cursor: 'pointer',
    transition: '.3s all ease',
    '&:hover': {
      transform: 'translateY(-1%)',
      boxShadow: theme.shadows[6]
    }
  },
  media: {
    height: 297,
    backgroundPosition: 'center center'
  },
  chip: {
    margin: theme.spacing.unit
  },
  actions: {
    paddingRight: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

const Post = ({ classes, post }) => (
  <div className="col-xs-12 col-md-6">
    <a href={"/blog/" + getSlug(post.attributes.title)} title={post.attributes.title}>
      <Card className={classes.card}>
        <CardMedia
          image={`/static/img/posts/${post.attributes.img}.jpg`}
          title={post.attributes.title}
          className={classes.media}
        />
        <CardContent>
          <Typography type="headline" component="h2">
            {post.attributes.title}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions + " row between-xs middle-xs"}>
          <div>
            <Typography type="caption">
              {post.attributes.displayDate},
              {` by ${post.attributes.author}`}
            </Typography>
          </div>
          <Button color="accent" component="a">
            Read More
          </Button>
        </CardActions>
      </Card>
    </a>
  </div>
);

Post.PropTypes = {
  classes: PropTypes.object.isRequired
};


export default withStyles(styles)(Post);