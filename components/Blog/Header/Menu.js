import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
  container: {
    width: 1120,
    flexBasis: 1120,
    marginTop: theme.spacing.unit * 6
  }
});

const Menu = ({ classes }) => (
  <div className={classes.container}>
    <div className="row col-xs-12">
      <div className="row col-xs-6 start-xs">
        <Button color="contrast">
          Home
        </Button>
        <Button color="contrast">
          JavaScript
        </Button>
        <Button color="contrast">
          Python
        </Button>
        <Button color="contrast">
          Design
        </Button>
      </div>
      <div className="row col-xs-6 end-xs">
        <Button color="contrast">
          The Devs Telegram
        </Button>
      </div>
    </div>
  </div>
);

Menu.PropTypes = {
  classes: PropTypes.object.isRequired
};


export default withStyles(styles)(Menu);