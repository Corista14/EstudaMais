import React, { useState, useEffect } from "react";
import { Container, Grow, makeStyles } from "@material-ui/core";
import SubjectCard from "../SubjectCard";

function BasicoCards() {
  const classes = useStyles();

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(true);
  }, []);

  return (
    <Grow in={checked}>
      <Container maxWidth="sm" className={classes.container}>
        <SubjectCard subject="Ciências Naturais" isBasico={true} />
      </Container>
    </Grow>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    paddingBottom: theme.spacing(7),
  },
}));

export default BasicoCards;
