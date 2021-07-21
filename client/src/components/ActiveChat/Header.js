import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import LogoutButton from "../LogoutButton";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 89,
    marginBottom: theme.spacing(4),
    boxShadow: "0 2px 20px 0 rgba(88,133,196,0.10)",
  },
  content: {
    display: "flex",
    alignItems: "center",
    marginLeft: theme.spacing(3),
  },
  username: {
    fontSize: theme.typography.h6.fontSize,
    letterSpacing: -0.29,
    fontWeight: theme.typography.fontWeightBold,
    marginRight: theme.spacing(2),
  },
  statusText: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.palette.secondary.main,
    letterSpacing: -0.17,
  },
  statusDot: {
    height: 8,
    width: 8,
    borderRadius: "50%",
    marginRight: theme.spacing(0.6),
    backgroundColor: "#D0DAE9",
  },
  online: {
    background: "#1CED84",
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const { username, online } = props;

  return (
    <Box className={classes.root}>
      <Box className={classes.content}>
        <Typography className={classes.username}>{username}</Typography>
        <Box
          className={`${classes.statusDot} ${classes[online && "online"]}`}
        />
        <Typography className={classes.statusText}>
          {online ? "Online" : "Offline"}
        </Typography>
      </Box>
      <Box mr={2}>
        <LogoutButton className={classes.logout} />
      </Box>
    </Box>
  );
};

export default Header;
