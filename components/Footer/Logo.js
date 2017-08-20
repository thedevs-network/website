import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';

const styles = theme => ({
    logo: {
        width: 72,
        height: 72,
        marginBottom: "1em",
        boxShadow: theme.shadows[8]
    }
});

const Logo = ({classes}) => (
    <div className="row center-xs col-xs-12">
        <Avatar src='/static/img/thedevs_greyscale.jpg' alt="the devs logo" className={classes.logo} />
    </div>
)

Logo.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Logo);