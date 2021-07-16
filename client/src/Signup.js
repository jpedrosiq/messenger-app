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
import { useStyles } from "./styles/welcomePageStyles";
import SideBanner from "./styles/sideBanner";
import PageHeader from "./styles/welcomePageHeader";

const Login = (props) => {
  const classes = useStyles();

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
    <Box className={classes.root}>
      <SideBanner classes={classes} />
      <Box className={classes.welcomePageContainer}>
        <PageHeader
          classes={classes}
          headerContent="Already have an account?"
          buttonContent="Login"
          onClick={() => history.push("/login")}
        />
        <Grid container justifyContent="center">
          <Box m={4}>
            <form className={classes.form} onSubmit={handleRegister}>
              <Grid>
                <Typography variant="h5">Create an account.</Typography>
                <Grid>
                  <FormControl>
                    <span className={classes.formLabel}>Username</span>
                    <TextField
                      aria-label="username"
                      className={classes.textField}
                      name="username"
                      type="text"
                      required
                    />
                  </FormControl>
                </Grid>
                <Grid>
                  <FormControl>
                    <span className={classes.formLabel}>E-mail address</span>
                    <TextField
                      aria-label="e-mail address"
                      type="email"
                      className={classes.textField}
                      name="email"
                      required
                    />
                  </FormControl>
                </Grid>
                <Grid>
                  <FormControl error={!!formErrorMessage.confirmPassword}>
                    <span className={classes.formLabel}>Password</span>
                    <TextField
                      aria-label="password"
                      type="password"
                      inputProps={{ minLength: 6 }}
                      name="password"
                      className={classes.textField}
                      required
                    />
                    <FormHelperText>
                      {formErrorMessage.confirmPassword}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid>
                  <FormControl error={!!formErrorMessage.confirmPassword}>
                    <span className={classes.formLabel}>Confirm Password</span>
                    <TextField
                      aria-label="confirm password"
                      type="password"
                      inputProps={{ minLength: 6 }}
                      className={classes.textField}
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
                className={classes.submitButton}
                type="submit"
                variant="contained"
                size="large"
              >
                Create
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
