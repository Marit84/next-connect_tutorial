import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ShareOutlined from "@material-ui/icons/ShareOutlined";
import withStyles from "@material-ui/core/styles/withStyles";

import ActiveLink from "./ActiveLink";
import { signoutUser } from "../lib/auth";

const Navbar = ({ classes, router, pageProps: { auth } }) => {
  const { user = {} } = auth || {};
  return (
    <AppBar
      className={classes.appBar}
      position={router.pathname === "/" ? "fixed" : "static"}
    >
      <Toolbar>
        {/* main title / home button*/}
        <ActiveLink href="/">
          <ShareOutlined className={classes.icon} />
        </ActiveLink>
        <Typography
          variant="h5"
          component="h1"
          className={classes.toolbarTiltle}
        >
          <ActiveLink href="/">NextConnect</ActiveLink>
        </Typography>

        {user._id ? (
          // auth navigation
          <div className={classes.navButtons}>
            <Button className={classes.navButton}>
              <ActiveLink href={`/profile/${user._id}`}>Profile</ActiveLink>
            </Button>
            <Button className={classes.navButton} onClick={signoutUser} variant="outlined">Sign out</Button>
          </div>
        ) : (
          // unAuth navigation
          <div className={classes.navButtons}>
            <Button className={classes.navButton}>
              <ActiveLink href="/signin">Sign in</ActiveLink>
            </Button>
            <Button className={classes.navButton}>
              <ActiveLink href="/signup">Sign up</ActiveLink>
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

const styles = (theme) => ({
  appBar: {
    // z-index 1 higher than the fixed drawer in home page to clip it under the navigation
    zIndex: theme.zIndex.drawer + 1,

  },
  toolbarTitle: {
    flex: 1,
  },
  icon: {
    marginRight: theme.spacing.unit,
  },
  navButtons: {
flex: 1,

 },
  navButton: {
    float: 'right',
    marginLeft: theme.spacing.unit,
  },
});

export default withStyles(styles)(Navbar);
