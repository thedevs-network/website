import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';

import Logo from './Logo';
import Titles from './Titles';
import Buttons from './Buttons';

const styleSheet = createStyleSheet('Header', theme => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing.unit * 13,
    paddingBottom: theme.spacing.unit * 13,
    backgroundColor: theme.palette.primary[700],
    color: '#f5f5f5'
  }
}));

const Header = ({ classes }) => (
  <div className={`${classes.root} row center-xs`} >
    <Logo />
    <Titles />
    <Buttons />
  </div>
)

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styleSheet)(Header);