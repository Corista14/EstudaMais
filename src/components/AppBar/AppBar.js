import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import MyDrawer from "../Drawer/MyDrawer";

function MyAppBar({ description }) {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);

  function handldeOpenDrawer() {
    setOpenDrawer(true);
  }

  function handldeCloseDrawer() {
    setOpenDrawer(false);
  }

  return (
    <div className={classes.root}>
      <AppBar elevation={1} className={classes.appbar} position="static">
        <Toolbar>
          <IconButton
            onClick={handldeOpenDrawer}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <Menu />
          </IconButton>
          <Typography variant="h5" className={classes.title}>
            Estuda+
          </Typography>
          <Typography variant="body1">{description}</Typography>
        </Toolbar>
      </AppBar>

      <MyDrawer
        open={openDrawer}
        onOpen={handldeOpenDrawer}
        onClose={handldeCloseDrawer}
      />
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontWeight: "520",
  },
  appbar: {
    backgroundColor: "primary",
    padding: theme.spacing(1),
  },
}));

export default MyAppBar;
