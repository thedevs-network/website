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

const showCats = (cat, index) => (
  <Button href={'/blog?cat=' + cat} key={index} color="contrast">
    {cat}
  </Button>
);

const Menu = ({ classes, cats }) => (
  <div className={classes.container}>
    <div className="row col-xs-12">
      <div className="row col-xs-12 col-md-6 start-md center-xs">
        <Button href="/blog/" color="contrast">
          All
        </Button>
        {cats.map(showCats)}
      </div>
      <div className="row col-xs-12 col-md-6 end-md center-xs">
        <Button href="/" color="accent" raised>
          Community
        </Button>
      </div>
    </div>
  </div>
);

Menu.PropTypes = {
  classes: PropTypes.object.isRequired
};


export default withStyles(styles)(Menu);