import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import { Image } from "cloudinary-react";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  date: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: "#91A3C0",
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: "bold",
  },
  bubble: {
    background: "#F4F6FA",
    borderRadius: "10px 10px 0 10px",
  },
  attachments: {
    width: "50%",
    borderRadius: "10px 10px 0 10px",
    float: "right",
  },
}));

const SenderBubble = (props) => {
  const classes = useStyles();
  const { time, text, attachments } = props;

  const renderAttachments =
    attachments &&
    attachments.length > 0 &&
    attachments.map((attachment, idx) => (
      <Box className={classes.attachments}>
        <Image
          className={classes.attachments}
          key={idx}
          cloudName="dtcgl7plw"
          publicId={attachment}
        />
      </Box>
    ));

  return (
    <Box className={classes.root}>
      <Typography className={classes.date}>{time}</Typography>
      {renderAttachments}
      <Box className={classes.bubble}>
        <Typography className={classes.text}>{text}</Typography>
      </Box>
    </Box>
  );
};

export default SenderBubble;
