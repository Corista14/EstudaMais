import {
  Container,
  Grid,
  Typography,
  makeStyles,
  Box,
  Card,
  CardMedia,
  CardContent,
  Link,
} from "@material-ui/core";
import React from "react";
import MyAppBar from "../components/AppBar/AppBar";
import abtImg from "../images/about.svg";

function About() {
  const classes = useStyles();

  return (
    <div>
      <MyAppBar description="Sobre Nós" />

      <Container className={classes.mainContainer}>
        <Container maxWidth="md">
          <Card elevation={7} className={classes.root}>
            <CardMedia className={classes.image} image={abtImg} title="Study" />
            <CardContent>
              <Typography gutterBottom variant="h5">
                Projeto das DAC 11º CT3
              </Typography>
              <Typography gutterBottom variant="body" color="textSecondary">
                Este é a nossa proposta de projeto das DAC, um site com o
                intuito de partilhar recursos pedagógicos e didáticos do curso
                de Ciências. Para os mais interessados na parte da programação,
                o repositório do código do site está disponível no meu{" "}
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/Corista14/EstudaMais"
                >
                  GitHub
                </Link>
                .
              </Typography>
            </CardContent>
          </Card>
        </Container>

        <Box mt={7}>
          <Typography align="center" variant="h6">
            Desenvolvido por <strong>Filipe Corista</strong> e com a coloboração
            de <strong>Diana Ferreira</strong>, <strong>Afonso Trigo</strong> e{" "}
            <strong>Diogo Paulo.</strong>
          </Typography>
        </Box>
      </Container>
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  image: {
    height: 240,
  },
  mainContainer: {
    marginTop: theme.spacing(5)
  }
}));
export default About;
