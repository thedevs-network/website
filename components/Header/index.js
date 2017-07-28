import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import Logo from './Logo';
import Titles from './Titles';
import Buttons from './Buttons';

const styleSheet = createStyleSheet('Header', theme => ({
    root: {
        flexGrow: 1,
        paddingTop: theme.spacing.unit * 16,
        paddingBottom: theme.spacing.unit * 16,
        backgroundColor: theme.palette.primary[700],
        color: '#f5f5f5'
    },
    container: {
        width: 1120,
        flexBasis: 1120
    }
}));

const Header = (props) => {
    const { classes } = props;
    return (
        <Grid container justify="center" className={classes.root}>
            <Grid container justify="center" gutter={40} className={classes.container}>
                <Logo />
                <Titles />
                <Buttons />
            </Grid>
        </Grid>
    )
}

Header.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styleSheet)(Header);