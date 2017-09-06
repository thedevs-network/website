import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  logoLink: { 
    display: 'flex',
    alignItems: 'center' 
  },
  logo: {
    width: 44,
    height: 44,
    boxShadow: theme.shadows[4]
  },
  title: {
    marginLeft: theme.spacing.unit * 2,
    color: '#f5f5f5',
    fontWeight: 500
  },
  '@media screen and (max-width: 1120px)': {
    logo: {
      width: 40,
      height: 40
    },
    title: {
      marginLeft: theme.spacing.unit,
      padding: '1em 0'
    }
  }
});

const Logo = ({ classes }) => (
  <div className="row center-xs start-md middle-xs col-xs-12 col-md-6">
    <a className={classes.logoLink} href="/">
      <Avatar src='/static/img/thedevs.png' alt="the devs logo" className={classes.logo} />
      <Typography type="headline" className={classes.title}>
        The Devs
    </Typography>
    </a>
  </div >
);

Logo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Logo);