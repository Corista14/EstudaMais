import {
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  IconButton,
  Divider,
} from "@material-ui/core";
import {
  Assignment,
  ChevronRight,
  Home,
  Info,
  MenuBook,
  Person,
  ExitToApp,
  PersonAdd,
} from "@material-ui/icons";
import React, { useState } from "react";
import logo from "../../images/logo-dark.svg";
import LogoutDialog from "../LogoutDialog/LogoutDialog";
import { useHistory, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function MyDrawer({ open, onOpen, onClose }) {
  const classes = useStyles();
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [openDialog, setOpenDialog] = useState(false);
  const [canLogout, setCanLogout] = useState(false);
  
  const handleLogout = async (e) => {
    e.preventDefault();
    handleOpenDialog();

    setCanLogout(true);
    if (canLogout) {
      await logout();
      history.push("/landing");
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCanLogout(false);
  };


  return (
    <div>
      <SwipeableDrawer anchor="left" open={open} onOpen={onOpen} onClose={onClose}>
        <div className={classes.drawerHeader}>
          <img src={logo} className={classes.logo} alt="Estuda Mais logo" />
          <IconButton onClick={onClose}>
            <ChevronRight />
          </IconButton>
        </div>
        <Divider className={classes.divider} />

        {currentUser ? (
          <>
            {" "}
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <List className={classes.list}>
                <ListItem button>
                  <ListItemIcon>{<Home />}</ListItemIcon>
                  <ListItemText primary="Início" />
                </ListItem>
              </List>
            </Link>
            <Link
              to="/secundario"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <List className={classes.list}>
                <ListItem button>
                  <ListItemIcon>{<Assignment />}</ListItemIcon>
                  <ListItemText primary="Ensino Secundário" />
                </ListItem>
              </List>
            </Link>
            <Link
              to="/basico"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <List className={classes.list}>
                <ListItem button>
                  <ListItemIcon>{<MenuBook />}</ListItemIcon>
                  <ListItemText primary="Ensino Básico" />
                </ListItem>
              </List>
            </Link>
            <Link
              to="/profile"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <List className={classes.list}>
                <ListItem button>
                  <ListItemIcon>{<Person />}</ListItemIcon>
                  <ListItemText color="textSecondary" primary="Perfil" />
                </ListItem>
              </List>
            </Link>
            <Link to="/about" className={classes.link}>
              <List className={classes.list}>
                <ListItem button>
                  <ListItemIcon>{<Info />}</ListItemIcon>
                  <ListItemText primary="Sobre nós" />
                </ListItem>
              </List>
            </Link>
            <List className={classes.leave}>
              <ListItem button onClick={handleLogout}>
                <ListItemIcon>
                  <ExitToApp color="#f44336" />
                </ListItemIcon>
                <ListItemText
                  className={classes.leaveText}
                  primary="Sair da Conta"
                />
              </ListItem>
            </List>
            <LogoutDialog
              openDialog={openDialog}
              closeDialog={handleCloseDialog}
              yesButton={handleLogout}
            />{" "}
          </>
        ) : (
          <>
            <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
              <List className={classes.list}>
                <ListItem button>
                  <ListItemIcon>{<Home />}</ListItemIcon>
                  <ListItemText primary="Início" />
                </ListItem>
              </List>
            </Link>

            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to="/register"
            >
              <List className={classes.list}>
                <ListItem button>
                  <ListItemIcon>{<PersonAdd />}</ListItemIcon>
                  <ListItemText primary="Registar" />
                </ListItem>
              </List>
            </Link>

            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to="/about"
            >
              <List className={classes.list}>
                <ListItem button>
                  <ListItemIcon>{<Info />}</ListItemIcon>
                  <ListItemText primary="Sobre Nós" />
                </ListItem>
              </List>
            </Link>
          </>
        )}
      </SwipeableDrawer>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  list: {
    width: "auto",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "space-between",
    marginTop: theme.spacing(2),
  },
  logo: {
    maxWidth: 180,
    padding: theme.spacing(0, 1),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
  leave: {
    width: 245,
    bottom: 0,
    position: "fixed",
    paddingBottom: 20,
    color: "#f44336",
  },
  leaveText: {
    color: "secondary",
  },
  link: {
    textDecoration: "none",
    color: "#212121",
  },
}));

export default MyDrawer;
