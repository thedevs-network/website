import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';

const styles = theme => ({
  logo: {
    width: 145,
    height: 145,
    marginBottom: "1em",
    boxShadow: theme.shadows[4]
  }
});

const Logo = ({ classes }) => (
  <div className="row center-xs col-xs-12">
    <a href="/">
      <Avatar src='/static/img/thedevs.png' alt="the devs logo" className={classes.logo} />
    </a>
  </div>
);

Logo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Logo);