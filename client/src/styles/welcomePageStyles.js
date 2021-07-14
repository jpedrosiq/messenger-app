import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "row",
  },
  welcomePageContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  sideBanner: {
    position: "relative",
    "&::after": {
      content: '""',
      position: "absolute",
      width: "100%",
      height: "100%",
      top: "0",
      left: "0",
      background: "linear-gradient(#3a8dff, #86b9ff)",
      opacity: "0.85",
    },
  },
  sideBannerDescription: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    left: "50%",
    transform: "translate(-50%,-30%)",
    top: "30%",
    zIndex: "1",
    color: "white",
    fontSize: "20px",
    width: "269px",
    height: "186px",
    "& span": {
      lineHeight: "34px",
      marginTop: "50px",
    },
  },
  submitButton: {
    margin: "40px auto",
    width: "160px",
    height: "56px",
    backgroundColor: "#3a8dff",
    color: "white",
    fontSize: "14px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#529aff",
    },
  },
  headerContent: {
    display: "flex",
    marginTop: "30px",
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: "40px",
    fontSize: "12px",
  },
  headerButton: {
    color: "#3a8dff",
    marginLeft: "100px",
    height: "54px",
    width: "170px",
    boxShadow: "0 0 8px 0 rgb(0 0 0 / 20%)",
    borderRadius: "5px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  formLabel: {
    color: "rgb(143, 143, 143)",
    fontSize: "14px",
    marginTop: "20px",
    marginBottom: "10px",
  },
  headerText: {
    color: "rgb(143, 143, 143)",
  },
  textField: {
    width: "400px",
  },
  bgImage: {
    maxWidth: "100%",
    height: "auto",
    width: "75vw",
  },
}));
