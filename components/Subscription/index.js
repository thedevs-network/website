import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import axios from 'axios';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { red, green } from 'material-ui/colors';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 6,
    backgroundColor: theme.palette.primary[700],
    color: theme.palette.grey[100],
  },
  container: {
    flexGrow: 1120,
    width: 1120,
  },
  labelClassName: {
    color: theme.palette.shades.dark.input.labelText,
  },
  InputClassName: {
    width: '18em',
    marginBottom: '1em',
    color: theme.palette.shades.dark.input.inputText,
    '&:hover': {
      '&:before': {
        backgroundColor: theme.palette.shades.dark.input.disabled + ' !important',
      },
    },
    '&:before': {
      backgroundColor: theme.palette.shades.dark.input.disabled,
    },
    '&:after': {
      backgroundColor: theme.palette.shades.dark.input.bottomLine,
    },
  },
  submit: {
    marginLeft: '2em',
    '@media screen and (max-width: 768px)': {
      marginLeft: 0,
    },
  },
  error: {
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
  success: {
    backgroundColor: green[500],
    cursor: 'default',
    '&:hover': {
      backgroundColor: green[700],
    },
  },
});

class Subscription extends Component {
  constructor() {
    super();
    this.state = {
      button: 'subscribe',
    };
    this.handleSubscribe = this.handleSubscribe.bind(this);
  }

  handleSubscribe(e) {
    if (e.key && e.key !== 'Enter') {
      return;
    }
    const input = document.getElementById('subsription-email');
    const email = input.value;
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi
        .test(email)
    ) {
      return this.setState({ button: 'error' });
    }
    this.setState({ button: 'loading...' });
    axios.post('/subscription', { email })
      .then(res => this.setState({ button: 'success' }))
      .catch(err => this.setState({ button: 'error' }))
  }

  render() {
    const { button } = this.state;
    const { classes } = this.props;
    const buttonClass = button === 'subscribe' ? '' : button;
    const subscription = button === 'success' ?
      (
        <Button
          color="accent"
          className={classes[buttonClass]}
          raised
        >
          Subscribed successfully!
        </Button>
      ) :
      (
        <div className="col-xs-12 col-md">
          <TextField
            id="subsription-email"
            name="email"
            type="email"
            label="Your Email Address"
            labelClassName={classes.labelClassName}
            InputClassName={classes.InputClassName}
            onKeyPress={this.handleSubscribe}
          />
          <Button
            color="accent"
            className={classes.submit + ' ' + classes[buttonClass.replace('.', '')]}
            onClick={this.handleSubscribe}
            raised 
          >
            {button}
          </Button>
        </div>
      )

    return (
      <div className={classes.root + " row center-xs"}>
        <div className={classes.container + " row middle-xs center-md start-xs"}>
          <div className="col-xs-12 col-md">
            <Typography type="title" color="inherit" align="left">
              Be the first to receive our new <strong>groups</strong> and <strong>articles</strong>.
            </Typography>
          </div>
          {subscription}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Subscription);