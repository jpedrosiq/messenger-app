import { Box, Typography } from "@material-ui/core";
import BgImage from "../assets/images/bg-img.png";
import BubbleChat from "../assets/images/bubble.svg";

const SideBanner = ({ classes }) => (
  <Box className={classes.sideBanner}>
    <Box className={classes.sideBannerDescription}>
      <img src={BubbleChat} alt="bubble-chat" width="67px" height="67px" />
      <Box mt={4}>
        <Typography variant="h5">
          Converse with anyone with any language
        </Typography>{" "}
      </Box>
    </Box>
    <img className={classes.bgImage} src={BgImage} alt="login-page" />
  </Box>
);

export default SideBanner;
