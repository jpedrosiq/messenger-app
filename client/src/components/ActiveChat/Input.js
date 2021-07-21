import React, { Component } from "react";
import {
  FormControl,
  FilledInput,
  Button,
  InputAdornment,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";
import { theme } from "../../themes/theme";

const styles = {
  root: {
    justifySelf: "flex-end",
    marginTop: 15,
  },
  input: {
    height: 70,
    backgroundColor: "#F4F6FA",
    borderRadius: 8,
    marginBottom: 20,
  },
  button: {
    color: theme.palette.action.disabled,
    padding: theme.spacing(1),
    marginRight: theme.spacing(2),
    minWidth: 0,
    fontSize: theme.spacing(2.5),
  },
};

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      attachments: [],
    };
  }

  handleChange = (event) => {
    this.setState({
      text: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: event.target.text.value,
      recipientId: this.props.otherUser.id,
      conversationId: this.props.conversationId,
      sender: this.props.conversationId ? null : this.props.user,
      attachments: this.state.attachments,
    };
    // only post message when it's not an empty string, unless there are attachments to that message
    if (
      reqBody.attachments.length > 0 ||
      (reqBody.text !== "" && reqBody.attachments.length === 0)
    ) {
      await this.props.postMessage(reqBody);
      // empty the state (text and attachments) every time a message is posted
      this.setState({
        text: "",
        attachments: [],
      });
    }
  };

  uploadImage = (files) => {
    const formData = new FormData();
    const attachments = [];

    // function that handles each promise post request from Cloudinary
    const promiseForAttachmentUrl = (attachment) => {
      formData.append("file", attachment);
      formData.append("upload_preset", "vgnox97i");

      return fetch("https://api.cloudinary.com/v1_1/dtcgl7plw/image/upload", {
        method: "POST",
        body: formData,
      });
    };

    for (let idx in files) {
      attachments.push(promiseForAttachmentUrl(files[idx]));
    }

    // only execute after all the images uploaded were fetched from Cloudinary
    Promise.all(attachments)
      .then((response) => {
        return Promise.all(response.map((res) => res.json()));
      })
      .then((dataArr) => {
        dataArr.forEach((data) => {
          // only push the attachment to attachments array if url exists
          data.url &&
            this.setState((prevState) => ({
              attachments: [data.url, ...prevState.attachments],
            }));
        });
        alert("Attachments successfully uploaded! Press 'enter' to submit.");
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.root} onSubmit={this.handleSubmit}>
        <FormControl fullWidth hiddenLabel>
          <FilledInput
            classes={{ root: classes.input }}
            disableUnderline
            placeholder="Type something..."
            value={this.state.text}
            name="text"
            onChange={this.handleChange}
            endAdornment={
              <InputAdornment position="end">
                <input
                  accept="image/*"
                  hidden
                  id="file-button"
                  multiple
                  type="file"
                  onChange={(e) => this.uploadImage(e.target.files)}
                />
                <label htmlFor="file-button">
                  <Button
                    component="span"
                    title="Upload Images"
                    className={classes.button}
                  >
                    <i className="fa fa-clone"></i>
                  </Button>
                </label>
              </InputAdornment>
            }
          />
        </FormControl>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversations: state.conversations,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Input));
