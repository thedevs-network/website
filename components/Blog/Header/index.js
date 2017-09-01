import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Menu from './Menu';
import Logo from '../../Header/Logo';
import Titles from '../../Header/Titles';

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing.unit * 8,
    paddingBottom: theme.spacing.unit * 3,
    backgroundColor: theme.palette.primary[700],
    boxShadow: theme.shadows[4],
    color: '#f5f5f5'
  }
});

const Header = ({ classes, cats }) => (
  <div className={`${classes.root} row center-xs`} >
    <Logo />
    <Titles />
    <Menu cats={cats} />
  </div>
);

Header.PropTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);