import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Group from './Group';
import Button from 'material-ui/Button';

const styles = theme => ({
  container: {
    width: 1120,
    flexBasis: 1120,
    marginTop: 8,
    paddingTop: theme.spacing.unit * 13,
    paddingBottom: theme.spacing.unit * 13,
    backgroundColor: theme.palette.shades.light.background.default
  },
  title: {
    marginBottom: theme.spacing.unit * 7
  }
});

const showGroups = (group, index) => (
  <Group
    key={index}
    displayName={group.displayName}
    name={group.name}
    count={group.count}
    link={group.link}
  />
);

const Community = ({ classes, groups }) => (
  <div className="row center-xs">
    <div className={classes.container + " row center-xs"}>
      <div className={classes.title + " row center-xs col-xs-12"} id="community">
        <Typography type="display1" gutterBottom>
          Join The Communities
        </Typography>
      </div>
      <div className="row start-xs col-xs-12">
        {groups.map(showGroups)}
      </div>
      <div className="row center-xs" style={{marginTop: "4em"}}>
        <Button href="/blog/" color="accent" raised>
          Read our Blog
        </Button>
      </div>
    </div>
  </div>
)

Community.PropTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Community);