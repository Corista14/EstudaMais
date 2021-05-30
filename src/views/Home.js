import {
  Box,
  Container,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import MyAppBar from "../components/AppBar/AppBar";
import ResourceCard from "../components/ResourceCard/ResourceCard";
import { useResourceByPopular } from "../hooks/useResource";
import { Alert } from "@material-ui/lab";

function MyHome() {
  const classes = useStyles();
  const { queriedResourceByPopular } = useResourceByPopular();
  return (
    <div>
      <MyAppBar description="Início" />
      <Container className={classes.mainContainer}>
        <Typography align="left" variant="h4">
          Recursos Populares
        </Typography>
        <Divider className={classes.divider} />

        <Grid className={classes.resGrid} spacing={6} maxWidth="xs">
          {queriedResourceByPopular.length === 0 ? (
            <Box mt={3}>
              <Alert severity="warning">
                <Typography>
                  Parece que os alunos não estão a fazer download dos
                  recursos... Nada por aqui!
                </Typography>
              </Alert>
            </Box>
          ) : (
            queriedResourceByPopular.map((resource, index) => {
              return (
                <Box key={index} mt={3}>
                  <ResourceCard
                    title={resource.name}
                    author={resource.author}
                    downloadUrl={resource.url}
                    year={resource.year}
                    subject={resource.subject}
                  />
                </Box>
              );
            })
          )}
        </Grid>
      </Container>
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  mainContainer: {
    marginTop: theme.spacing(4),
  },
  divider: {
    marginTop: theme.spacing(1),
  },
  resGrid: {
    paddingBottom: theme.spacing(4),
  },
}));

export default MyHome;
