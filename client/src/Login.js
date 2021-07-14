import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import BgImage from "./assets/images/bg-img.png";
import BubbleChat from "./assets/images/bubble.svg";
import { useStyles } from "./styles/welcomePageStyles";

const Login = (props) => {
  const history = useHistory();
  const { user, login } = props;

  const classes = useStyles();

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Box className={classes.root}>
      <Box className={classes.sideBanner}>
        <Box className={classes.sideBannerDescription}>
          <img src={BubbleChat} alt="bubble-chat" width="67px" height="67px" />
          <span>Converse with anyone with any language</span>
        </Box>
        <img className={classes.bgImage} src={BgImage} alt="login-page" />
      </Box>
      <Box className={classes.welcomePageContainer}>
        <Box className={classes.headerContent}>
          <Typography className={classes.headerText} variant="subtitle2">
            Don't have an account?
          </Typography>
          <Button
            className={classes.headerButton}
            onClick={() => history.push("/register")}
          >
            Register
          </Button>
        </Box>
        <Grid container justifyContent="center">
          <Box m={4}>
            <form className={classes.form} onSubmit={handleLogin}>
              <Grid>
                <Typography variant="h5">Welcome back!</Typography>
                <Grid>
                  <FormControl margin="normal" required>
                    <span className={classes.formLabel}>Username</span>
                    <TextField
                      aria-label="username"
                      className={classes.textField}
                      name="username"
                      type="text"
                    />
                  </FormControl>
                </Grid>
                <FormControl margin="normal" required>
                  <span className={classes.formLabel}>Password</span>
                  <TextField
                    aria-label="password"
                    className={classes.textField}
                    type="password"
                    name="password"
                  />
                </FormControl>
              </Grid>
              <Button
                className={classes.submitButton}
                type="submit"
                variant="contained"
                size="large"
              >
                Login
              </Button>
            </form>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
