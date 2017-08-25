import React from 'react';
import Typography from 'material-ui/Typography';

const Description = () => (
  <div className="row col-xs center-xs">
    <div className="col-xs-8">
      <Typography type="display2" style={{ color: "#f5f5f5", opacity: .5, marginBottom: ".5em" }}>
        / /
      </Typography>
      <Typography type="subheading" style={{ color: "#f5f5f5", lineHeight: "1.6", fontWeight: 400, opacity: .9 }}>
        The Devs is a community on Telegram that tries to gather developers around the world together and help them to chat and discuss about things they love.
      </Typography>
    </div>
  </div>
);

export default Description;