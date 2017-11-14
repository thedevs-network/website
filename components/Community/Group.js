import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit * 4
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'left',
    overflow: 'hidden',
    transition: 'all .2s ease',
    '&:hover': {
      boxShadow: theme.shadows[8],
      transform: 'translateY(-1%)'
    }
  },
  photo: {
    width: 64,
    height: 64,
    float: 'left',
    marginRight: theme.spacing.unit * 2,
    boxShadow: theme.shadows[4]
  },
  typography: {
    marginBottom: '.3em'
  },
  svg: {
    width: 10,
    height: 10,
    marginRight: 8
  }
});

const Group = (props) => {
  const { classes, displayName, name, count, link } = props;
  return (
    <div className={classes.root + " col-lg-4 col-md-6 col-sm-6 col-xs-12"}>
      <Paper className={classes.paper + " row col-xs-12 middle-xs between-xs"} elevation={2}>
        <div className="row col-xs middle-xs" style={{ padding: 0 }}>
          <Avatar src={`/static/img/${name}.png`} className={classes.photo} alt={name} />
          <div style={{ float: 'left' }}>
            <Typography type="title" className={classes.typography}>
              {displayName}
            </Typography>
            <Typography type="caption">
              {count} members
            </Typography>
          </div>
        </div>
        <Button color="accent" raised dense style={{ float: 'right' }} href={"https://t.me/joinchat/" + link} target="_blank">
          <img src="/static/img/telegram.svg" alt="Telegram" className={classes.svg} /> Join
        </Button>
      </Paper>
    </div>
  );
};

Group.PropTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Group);