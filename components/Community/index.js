import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';


const styleSheet = createStyleSheet('Community', theme => ({
    root: {
        flexGrow: 1,
        marginTop: 0,
        paddingTop: theme.spacing.unit * 16,
        paddingBottom: theme.spacing.unit * 16,
        backgroundColor: theme.palette.common.lightWhite
    },
    container: {
        width: 1120,
        flexBasis: 1120,
        backgroundColor: "yellow"
    },
    container2: {
        width: 1120,
        flexBasis: 1120,
        backgroundColor: "green"
    }
}));

const Community = ({classes}) => (
    <Grid container justify="center" className={classes.root}>
        <Grid container justify="center" gutter={40} className={classes.container1} id="community">
            <Grid item xs={12} style={{textAlign: "center"}}>
                <Typography type="display1">
                    Communities
                </Typography>
            </Grid>
        </Grid>
        <Grid container justify="center" gutter={40} className={classes.container2} id="community">
        <Grid item xs={12} style={{textAlign: "center"}}>
            <Typography type="display1">
                Communities
            </Typography>
        </Grid>
        </Grid>
    </Grid>
)

export default withStyles(styleSheet)(Community);