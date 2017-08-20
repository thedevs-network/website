import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
  svg: {
    width: 12,
    height: 12,
    marginRight: 8
  },
  button: {
    marginRight: '.5em',
    marginLeft: '.5em'
  }
});

const Buttons = ({ classes }) => (
  <div className="row center-xs col-xs-12">
    <Button color="accent" raised href="https://t.me/thedevs" target="_blank" className={classes.button}>
      <img src="/static/img/telegram.svg" alt="Telegram" className={classes.svg} /> Join The Channel
    </Button>
    <Button color="contrast" href="#community" className={classes.button}>
      <img src="/static/img/telegram.svg" alt="Telegram" className={classes.svg} /> Join The Groups
    </Button>
  </div>
)

Buttons.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Buttons);