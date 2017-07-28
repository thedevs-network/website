import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Avatar from 'material-ui/Avatar';

const styleSheet = createStyleSheet('Logo', theme => ({
    logo: {
        width: 100,
        height: 100,
        marginBottom: "1em",
        boxShadow: theme.shadows[8]
    }
}));

const Logo = ({classes}) => (
    <Grid container justify="center" gutter={40}>
        <Grid item>
            <Avatar src='/static/thedevs.jpg' alt="the devs logo" className={classes.logo} />
        </Grid>
    </Grid>
)

Logo.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styleSheet)(Logo);