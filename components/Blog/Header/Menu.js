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

const showTags = (tag, index) => (
  <Button href={'/blog?tag=' + tag} key={index} color="contrast">
    {tag}
  </Button>
);

const Menu = ({ classes, tags }) => (
  <div className={classes.container}>
    <div className="row col-xs-12">
      <div className="row col-xs-6 start-xs">
        <Button href="/blog/" color="contrast">
          All
        </Button>
        {tags.map(showTags)}
      </div>
      <div className="row col-xs-6 end-xs">
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