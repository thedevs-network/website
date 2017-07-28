import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

const styleSheet = createStyleSheet('Buttons', theme => ({
    svg: {
        width: 12,
        height: 12,
        marginRight: 8
    }
}));

const Buttons = ({ classes }) => (
    <Grid container justify="center" gutter={24}>
        <Grid item>
            <Button color="accent" raised>
                <img src="/static/telegram.svg" alt="Telegram" className={classes.svg} /> Join Channel
            </Button>
        </Grid>
        <Grid item>
            <Button color="contrast" href="#groups">
                <img src="/static/telegram.svg" alt="Telegram" className={classes.svg} /> Join Groups
            </Button>
        </Grid>
    </Grid>
)

Buttons.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styleSheet)(Buttons);