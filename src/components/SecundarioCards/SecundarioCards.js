import React, { useState, useEffect } from "react";
import { Container, Grow, makeStyles } from "@material-ui/core";
import SubjectCard from "../SubjectCard";

function SecundarioCards() {
  const classes = useStyles();

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(true);
  }, []);

  return (
    <Grow in={checked}>
      <Container maxWidth="sm" className={classes.container}>
        <SubjectCard
          subject="Matemática A"
          _3years={true}
        />
        <SubjectCard subject="FQA" _3years={false} />
        <SubjectCard subject="Biologia e Geologia" _3years={false} />
        <SubjectCard subject="Português" _3years={true} />
        <SubjectCard subject="Filosofia" _3years={false} />
      </Container>
    </Grow>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    paddingBottom: theme.spacing(7),
  },
}));

export default SecundarioCards;
