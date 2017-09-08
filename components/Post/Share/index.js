import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';

const styles = theme => ({
  shareComp: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignContent: 'center',
    '& a': {
      borderBottom: 'none !important',
    }
  },
  shareIcons: {
    flexGrow: '1 1 100%',
    display: 'flex',
    padding: '1em 2em',
    alignItems: 'center',
    background: '#eee',
  },
  text: {
    width: 'auto !important',
    margin: '0 1em 0 0 !important',
  },
  svg: {
    width: 16,
    height: 16,
    margin: '0 !important',
    boxShadow: 'none !important',
    backgroundColor: 'transparent !important',
  }
});

const Share = ({ classes, title }) => {
  return (
    <div className={classes.shareComp}>
      <div className={classes.shareIcons}>
        <Typography type="body1" className={classes.text}>
          Share socially:
        </Typography>
        <IconButton href={`https://t.me/share/url?url=https://thedevs.network/blog/${title}`} target="_blank">
          <img src="/static/img/share/telegram.svg" alt="Telegram" className={classes.svg} />
        </IconButton>
        <IconButton href={`https://twitter.com/home?status=https://thedevs.network/blog/${title}`} target="_blank">
          <img src="/static/img/share/twitter.svg" alt="Twitter" className={classes.svg} />
        </IconButton>
        <IconButton href={`https://www.facebook.com/sharer/sharer.php?u=https://thedevs.network/blog/${title}`} target="_blank">
          <img src="/static/img/share/facebook.svg" alt="Facebook" className={classes.svg} />
        </IconButton>
        <IconButton href={`https://plus.google.com/share?url=https://thedevs.network/blog/${title}`} target="_blank">
          <img src="/static/img/share/googleplus.svg" alt="Google+" className={classes.svg} />
        </IconButton>
        <IconButton href={`http://vk.com/share.php?url=https://thedevs.network/blog/${title}`} target="_blank">
          <img src="/static/img/share/vk.svg" alt="VK" className={classes.svg} />
        </IconButton>
        <IconButton href={`https://www.linkedin.com/shareArticle?mini=true&url=https://thedevs.network/blog/${title}`} target="_blank">
          <img src="/static/img/share/linkedin.svg" alt="Linkedin" className={classes.svg} />
        </IconButton>
      </div>
    </div>
  );
};

export default withStyles(styles)(Share);