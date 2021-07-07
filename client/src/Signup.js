import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
import BgImage from "./assets/images/bg-img.png";
import BubbleChat from "./assets/images/bubble.svg";
import "./styles/signup-login.css";

const Login = (props) => {
  const history = useHistory();
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="signup-page-container">
      <div className="side-banner">
        <div className="side-banner-description">
          <img src={BubbleChat} alt="bubble-chat" width="67px" height="67px" />
          <span>Converse with anyone with any language</span>
        </div>
        <img src={BgImage} alt="login-page" />
      </div>
      <div className="signup-content-container">
        <div className="signup-header">
          <Typography
            style={{ color: "rgb(143, 143, 143)" }}
            variant="subtitle2"
          >
            Already have an account?
          </Typography>
          <Button
            style={{ color: "#3a8dff", marginLeft: "100px" }}
            className="login-signup-button"
            onClick={() => history.push("/login")}
          >
            Login
          </Button>
        </div>
        <Grid container justify="center">
          <Box m={4}>
            <form className="login-signup-form" onSubmit={handleRegister}>
              <Grid>
                <Typography variant="h5">Create an account.</Typography>
                <Grid>
                  <FormControl>
                    <span className="form-label">Username</span>
                    <TextField
                      aria-label="username"
                      style={{ width: "400px" }}
                      name="username"
                      type="text"
                      required
                    />
                  </FormControl>
                </Grid>
                <Grid>
                  <FormControl>
                    <span className="form-label">E-mail address</span>
                    <TextField
                      aria-label="e-mail address"
                      type="email"
                      style={{ width: "400px" }}
                      name="email"
                      required
                    />
                  </FormControl>
                </Grid>
                <Grid>
                  <FormControl error={!!formErrorMessage.confirmPassword}>
                    <span className="form-label">Password</span>
                    <TextField
                      aria-label="password"
                      type="password"
                      inputProps={{ minLength: 6 }}
                      name="password"
                      style={{ width: "400px" }}
                      required
                    />
                    <FormHelperText>
                      {formErrorMessage.confirmPassword}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid>
                  <FormControl error={!!formErrorMessage.confirmPassword}>
                    <span className="form-label">Confirm Password</span>
                    <TextField
                      aria-label="confirm password"
                      type="password"
                      inputProps={{ minLength: 6 }}
                      style={{ width: "400px" }}
                      name="confirmPassword"
                      required
                    />
                    <FormHelperText>
                      {formErrorMessage.confirmPassword}
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                class="submit-button"
                type="submit"
                variant="contained"
                size="large"
              >
                Create
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
