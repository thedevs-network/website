import React from 'react';
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
    transition: '.4s all ease',
    '&:hover': {
      transform: 'translateY(-1%)',
      boxShadow: theme.shadows[12]
    }
  },
  media: {
    height: 200
  },
  chip: {
    margin: theme.spacing.unit
  },
  actions: {
    paddingRight: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2
  }
});

const Post = ({ classes, content }) => (
  <div className="col-xs-4">
    <Card className={classes.card}>
      <CardMedia
        image={`/static/img/posts/${getSlug(content.attributes.title)}.PNG`}
        title={content.attributes.title}
        className={classes.media}
      />
      <CardContent>
        <Typography type="headline" component="h2">
          {content.attributes.title}
        </Typography>
        <Typography component="p">
          {content.attributes.description}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions + " row between-xs"}>
        <Typography type="caption">
          {content.attributes.date}
        </Typography>
        <Typography type="caption" style={{ textAlign: "right" }}>
          {content.attributes.author}
        </Typography>
      </CardActions>
    </Card>
  </div>
);

export default withStyles(styles)(Post);