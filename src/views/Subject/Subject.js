import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grow,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import MyAppBar from "../../components/AppBar/AppBar";
import ResourceCard from "../../components/ResourceCard/ResourceCard";
import { useResourceByYear } from "../../hooks/useResource";
import { Alert } from "@material-ui/lab";

function Subject({ subject, year }) {
  const classes = useStyles();
  const { queriedResourceByYear } = useResourceByYear(subject, year);

  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);

  return (
    <div>
      <MyAppBar description={subject + " - " + year} />

      <Grow in={checked}>
        <Container className={classes.container} maxWidth="sm">
          <Card elevation={4}>
            <CardContent>
              <Typography variant="h5">Recursos</Typography>
              <Divider className={classes.divider} />

              <Container maxWidth="sm">
                {queriedResourceByYear &&
                  queriedResourceByYear.map((resource, index) => {
                    return (
                      <Box key={index} mt={4}>
                        <ResourceCard
                          title={resource.name}
                          year={resource.year}
                          downloadUrl={resource.url}
                          author={resource.author}
                          subject={resource.subject}
                        />
                      </Box>
                    );
                  })}

                {queriedResourceByYear.length === 0 ? (
                  <Alert className={classes.alert} severity="warning">
                    Ainda sem Recursos aqui!
                  </Alert>
                ) : null}
              </Container>
            </CardContent>
          </Card>
        </Container>
      </Grow>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  divider: {
    marginTop: theme.spacing(1),
  },
  container: {
    marginTop: theme.spacing(6),
  },
  alert: {
    marginTop: theme.spacing(3),
  },
}));

export default Subject;
