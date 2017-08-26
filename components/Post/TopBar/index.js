import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

const styles = theme => ({
  root: {
    position: 'fixed',
    width: '100%',
    top: -100,
    transition: '.3s all ease',
    zIndex: 9
  },
  container: {
    width: 1120,
    flexBasis: 1120
  },
  appBar: {
    backgroundColor: theme.palette.primary[700]
  },
  logo: {
    marginRight: theme.spacing.unit * 2,
    boxShadow: theme.shadows[4],
    float: 'left'
  },
  '@media screen and (max-width: 1120px)': {
    appBar: {
      padding: '.5em .2em'
    },
    logo: {
      margin: '0 .5em .5em 0'
    }
  }
});

class TopBar extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    let lastScroll = 0;
    const bar = document.querySelector('.top-bar');

    window.addEventListener('scroll', (e) => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      if (lastScroll > currentScroll && currentScroll > 300)
        bar.classList.add('active')
      else
        bar.classList.remove('active')
      lastScroll = currentScroll;
    });    
  }

  render() {
    return (
      <div className={this.props.classes.root + " top-bar"}>
        <AppBar position="static" className={this.props.classes.appBar}>
          <Toolbar className="row center-xs">
            <div className={this.props.classes.container + " row start-xs between-md middle-xs"}>
              <div className="row middle-xs">
                <Avatar src='/static/img/thedevs.png' alt="the devs logo" className={this.props.classes.logo} />
                <Typography type="title" color="inherit" style={{ float: "left" }}>
                  The Devs
                </Typography>
              </div>
              <div>
                <Button href="/blog/" color="contrast" style={{ marginRight: "1em" }}>
                  Blog
                </Button>
                <Button href="/" color="accent" raised>
                  Community
                </Button>
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

TopBar.PropTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TopBar);