import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
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
        fontWeight: 400, 
        opacity: .7
    }
}));

const Titles = ({classes}) => (
    <div className="row center-xs col-xs-12">
        <div className="col-xs-12">
            <Typography type="display3" className={classes.title}>
                The Devs
            </Typography>
        </div>
        <div className="col-xs-12">
            <Typography type="title" gutterBottom className={classes.subtitle}>
                Developers community on Telegram
            </Typography>
        </div>
    </div>
)

Titles.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styleSheet)(Titles);