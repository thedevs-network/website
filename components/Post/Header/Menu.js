import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Home from 'material-ui-icons/Home';

const Menu = () => (
  <div className="row col-xs-12 col-md-6 end-md center-xs">
    <Button href="/blog/" color="contrast" dense style={{ margin: "0 1em"}}>
      Blog
    </Button>
    <Button href="/" color="accent" dense raised>
      Community
    </Button>
  </div>
);


export default Menu;