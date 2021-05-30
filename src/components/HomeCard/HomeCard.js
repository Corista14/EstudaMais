import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  makeStyles,
  Typography,
} from "@material-ui/core";

function HomeCard({ title, description, image }) {
  const classes = useStyles();
  return (
    <div>
      <Container maxWidth="xs">
        <Card elevation={7} className={classes.root}>
          <CardMedia className={classes.image} image={image} title="Study" />
          <CardContent>
            <Typography gutterBottom variant="h5">
              {title}
            </Typography>
            <Typography gutterBottom variant="body2" color="textSecondary">
              {description}
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  image: {
    height: 170,
  },
  root: {
    maxWidth: 345,
  },
}));

export default HomeCard;
