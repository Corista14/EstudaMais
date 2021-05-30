import {
  makeStyles,
  Card,
  CardHeader,
  Avatar,
  Container,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grow,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import AddResourceModal from "../components/AddResourceModal/AddResourceModal";
import MyAppBar from "../components/AppBar/AppBar";
import useUser from "../hooks/useUser";
import profileImg from "../images/profile.jpg";

function Profile() {
  const { user } = useUser();
  const classes = useStyles();
  const username = user !== null ? user.username : null;

  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClickClose() {
    setOpen(false);
  }

  useEffect(() => {
    setChecked(true);
  }, []);

  return (
    <div>
      <MyAppBar description={"Perfil - " + username} />
      <Grow in={checked}>
        <Container className={classes.container}>
          {user && (
            <Card elevation={7} className={classes.card}>
              <CardHeader
                avatar={
                  <Avatar className={classes.avatar}>
                    {(username || "").charAt(0)}
                  </Avatar>
                }
                title={username}
                subheader={"Nível: " + user.level}
              />
              <CardMedia
                image={profileImg}
                className={classes.media}
                title="Escola"
              />

              <CardContent>
                <Typography gutterBottom variant="body1" color="textSecondary">
                  Olá, {username}! Não te esqueças que se tiveres um recurso que
                  queiras partilhar podes fazê-lo!
                </Typography>
              </CardContent>

              <CardActions>
                <Button onClick={handleClickOpen} color="primary">
                  Adicionar um Recurso
                </Button>
              </CardActions>
            </Card>
          )}
          <AddResourceModal open={open} onClose={handleClickClose} />
        </Container>
      </Grow>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: "#00796b",
  },
  card: {
    width: 500,
    borderRadius: 7,
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    marginTop: theme.spacing(6),
  },
  media: {
    height: 230,
  },
}));

export default Profile;
