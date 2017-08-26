import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Logo from './Logo';
import Menu from './Menu';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: theme.spacing.unit * 54,
    backgroundColor: theme.palette.primary[700],
    boxShadow: theme.shadows[4],
    color: '#f5f5f5'
  },
  container: {
    width: 1120,
    flexBasis: 1120,
    height: 88,
    alignItems: 'center'
  },
  '@media screen and (max-width: 1120px)': {
    root: {
      height: theme.spacing.unit * 38      
    },
    container: {
      width: '100%',
      flexBasis: '100%'
    }
  }
});

const Header = ({ classes }) => (
  <div className={classes.root + " row center-xs"} >
    <div className={classes.container + " row between-xs"} >
      <Logo />
      <Menu />
    </div>
  </div>
);

Header.PropTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);