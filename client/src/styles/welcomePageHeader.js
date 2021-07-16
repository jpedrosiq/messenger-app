import { Box, Typography, Button } from "@material-ui/core";

const PageHeader = ({ classes, headerContent, buttonContent, onClick }) => (
  <Box className={classes.headerContent}>
    <Typography className={classes.headerText} variant="subtitle2">
      {headerContent}
    </Typography>
    <Button className={classes.headerButton} onClick={onClick}>
      {buttonContent}
    </Button>
  </Box>
);

export default PageHeader;
