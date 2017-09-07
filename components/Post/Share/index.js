import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import FontAwesome from 'font-awesome';

const styles = theme => ({
    shareComp: {
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
    },
    shareIcons: {
        background: "#eee",
        width: "100vw",
        padding: "1em",
        display: "flex",
        alignContent: "center",
        '& *': {
            display: "inline",
            margin: "8px",
            alignSelf: "center"
        },
    }
});

const Share = ({ classes }) => (
    <div className={classes.shareComp}>
        <div className={classes.shareIcons}>
            <div>
                <p>Share socially:</p>
                <IconButton iconClassName="fa-twitter" />
                <IconButton iconClassName="fa-facebook" />
                <IconButton iconClassName="fa-telegram" />
            </div>
        </div>
    </div>
);

export default withStyles(styles)(Share);