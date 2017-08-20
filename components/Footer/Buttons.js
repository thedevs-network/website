import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

const styles = () => ({
  root: {
    marginTop: '4em'
  },
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
  <div className={classes.root + " row center-xs col-xs-12"}>
    <Button color="contrast" href="https://t.me/thedevs" target="_blank" className={classes.button}>
      <img src="/static/img/telegram.svg" alt="Telegram" className={classes.svg} /> Telegram
    </Button>
    <Button color="contrast" href="https://github.com/TheDevs-Network" target="_blank" className={classes.button}>
      <img src="/static/img/github.svg" alt="GitHub" className={classes.svg} /> GitHub
    </Button>
  </div>
)

Buttons.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Buttons);