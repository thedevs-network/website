import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';

const styleSheet = createStyleSheet('Logo', theme => ({
    logo: {
        width: 110,
        height: 110,
        marginBottom: "1em",
        boxShadow: theme.shadows[8]
    }
}));

const Logo = ({classes}) => (
    <div className="row center-xs col-xs-12">
        <Avatar src='/static/img/thedevs.jpg' alt="the devs logo" className={classes.logo} />
    </div>
)

Logo.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styleSheet)(Logo);