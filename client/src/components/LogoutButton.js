import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import { logout } from "../store/utils/thunkCreators";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { clearOnLogout } from "../store/index";

const styles = {
  root: {
    height: "97vh",
  },
};

class LogoutButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.user.id !== prevProps.user.id) {
      this.setState({
        isLoggedIn: true,
      });
    }
  }

  handleLogout = async () => {
    await this.props.logout(this.props.user.id);
  };

  render() {
    const { classes } = this.props;
    if (!this.props.user.id) {
      // If we were previously logged in, redirect to login instead of register
      if (this.state.isLoggedIn) return <Redirect to="/login" />;
      return <Redirect to="/register" />;
    }
    return (
      <>
        {/* logout button will eventually be in a dropdown next to username */}
        {/* <MoreHorizIcon classes={{ root: classes.ellipsis }} /> */}

        <Button className={classes.logout} onClick={this.handleLogout}>
          <MoreHorizIcon classes={{ root: classes.ellipsis }} />
        </Button>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (id) => {
      dispatch(logout(id));
      dispatch(clearOnLogout());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(LogoutButton));
