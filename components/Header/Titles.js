import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = () => ({
  title: {
    textAlign: "center",
    color: 'inherit',
    fontWeight: 500,
    marginBottom: '.2em'
  },
  subtitle: {
    textAlign: "center",
    color: 'inherit',
    marginBottom: '3em',
    fontWeight: 300,
    opacity: .7
  }
});

const Titles = ({ classes }) => (
  <div className="row center-xs col-xs-12">
    <div className="col-xs-12">
      <Typography type="display2" className={classes.title}>
        <a href="/">
          The Devs
          </a>
      </Typography>
    </div>
    <div className="col-xs-12">
      <Typography type="title" gutterBottom className={classes.subtitle}>
        Developers community on Telegram
      </Typography>
    </div>
  </div>
)

Titles.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Titles);