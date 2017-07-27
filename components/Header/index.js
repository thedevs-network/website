import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Avatar from 'material-ui/Avatar';

const styleSheet = createStyleSheet('Header', theme => ({
    root: {
        flexGrow: 1,
        paddingTop: 80,
        paddingBottom: 80,
        backgroundColor: theme.palette.primary[700],
        color: "#f5f5f5"
    },
    container: {
        width: 1120,
        flexBasis: 1120
    },
    logo: {
        width: 80,
        height: 80
    }
}));

const Header = (props) => {
    const { classes } = props;
    return (
        <Grid container justify="center" className={classes.root}>
            <Grid container justify="center" gutter={24} className={classes.container}>
                <Grid item xs={6}>
                     <Avatar src='/static/thedevs.jpg' alt="the devs logo" className={classes.logo} /> 
                </Grid>
                <Grid item xs={6}>
                    Hi!
                </Grid>
            </Grid>
        </Grid>
    )
}

Header.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styleSheet)(Header);