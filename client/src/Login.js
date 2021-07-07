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
import "./styles/signup-login.css";

const Login = (props) => {
  const history = useHistory();
  const { user, login } = props;

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
    <div className="login-page-container">
      <div className="side-banner">
        <div className="side-banner-description">
          <img src={BubbleChat} alt="bubble-chat" width="67px" height="67px" />
          <span>Converse with anyone with any language</span>
        </div>
        <img src={BgImage} alt="login-page" />
      </div>
      <div className="login-content-container">
        <div className="login-header">
          <Typography
            style={{ color: "rgb(143, 143, 143)" }}
            variant="subtitle2"
          >
            Don't have an account?
          </Typography>
          <Button
            style={{ color: "#3a8dff", marginLeft: "100px" }}
            className="login-signup-button"
            onClick={() => history.push("/register")}
          >
            Register
          </Button>
        </div>
        <Grid container justify="center">
          <Box m={4}>
            <form className="login-signup-form" onSubmit={handleLogin}>
              <Grid>
                <Typography variant="h5">Welcome back!</Typography>
                <Grid>
                  <FormControl margin="normal" required>
                    <span className="form-label">Username</span>
                    <TextField
                      aria-label="username"
                      style={{ width: "400px" }}
                      name="username"
                      type="text"
                    />
                  </FormControl>
                </Grid>
                <FormControl margin="normal" required>
                  <span className="form-label">Password</span>
                  <TextField
                    aria-label="password"
                    style={{ width: "400px" }}
                    type="password"
                    name="password"
                  />
                </FormControl>
              </Grid>
              <Button
                class="submit-button"
                type="submit"
                variant="contained"
                size="large"
              >
                Login
              </Button>
            </form>
          </Box>
        </Grid>
      </div>
    </div>
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
