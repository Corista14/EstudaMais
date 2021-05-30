import React from "react";
import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import HomeCard from "./HomeCard";
import studyImg from "../../images/study.svg";
import shareImg from "../../images/share-home.svg";
import enjoyImg from "../../images/enjoy-home.svg";

function HomeCards() {
  const classes = useStyles();

  return (
    <div>
      <Box className={classes.box}>
        <Container maxWidth="xl">
          <Grid
            container
            className={classes.grid}
            alignContent="center"
            alignItems="center"
            justify="center"
          >
            <Box mt={3}>
              <HomeCard
                image={studyImg}
                title="Estuda"
                description="Utitliza os recursos que são disponiblizados pela nossa comunidade para estudares!"
              />
            </Box>

            <Box mt={3}>
              <HomeCard
              image={shareImg}
                title="Partilha"
                description="Se tens um recurso que seja útil para outras pessoas, partilha connosco!"
              />
            </Box>

            <Box mt={3}>
              <HomeCard
              image={enjoyImg}
                title="Aproveita"
                description="Melhora o teu estudo ao visualizar os recursos que aqui são colocados!"
              />
            </Box>
          </Grid>
        </Container>
      </Box>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  box: {
    marginTop: theme.spacing(2),
    paddingBottom: theme.spacing(3),
  },
}));

export default HomeCards;
