import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

const styleSheet = createStyleSheet('Titles', theme => ({
    title: {
        textAlign: "center",
        color: 'inherit'
    },
    subtitle: {
        textAlign: "center",
        color: 'inherit',
        marginBottom: '3em',
        fontWeight: 300, 
        opacity: .8
    }
}));

const Titles = ({classes}) => (
    <Grid container justify="center" gutter={40}>
        <Grid item>
            <Typography type="display3" className={classes.title}>
                The Devs
            </Typography>
            <Typography type="title" gutterBottom className={classes.subtitle}>
                Developers community on Telegram
            </Typography>
        </Grid>
    </Grid>
)

Titles.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styleSheet)(Titles);