import React, { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  makeStyles,
  Typography,
  Menu,
  MenuItem,
  Link as MdLink,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

function SubjectCard({ subject, _3years, isBasico }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const trimSubject = subject.toLowerCase().trim();
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Card elevation={6} className={classes.card}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {subject}
          </Typography>

          {!isBasico ? (
            <Typography variant="body2" color="textSecondary">
              Recursos de {subject} do{" "}
              {_3years ? "10º, 11º e 12º ano." : "10º e 11º ano."}
            </Typography>
          ) : (
            <Typography variant="body2" color="textSecondary">
              Recursos de {subject} do 5º e 6º ano.
            </Typography>
          )}
        </CardContent>

        <CardActions>
          <Button onClick={handleMenuClick} color="primary">
            Aceder
          </Button>
        </CardActions>
      </Card>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {isBasico ? (
          <>
            {" "}
            <MdLink
              component={RouterLink}
              to={"/basico/" + trimSubject + "/quinto"}
            >
              <MenuItem>5º ano</MenuItem>
            </MdLink>{" "}
            <MdLink
              component={RouterLink}
              to={"/basico/" + trimSubject + "/sexto"}
            >
              <MenuItem>6º ano</MenuItem>
            </MdLink>{" "}
          </>
        ) : _3years ? (
          <>
            <MdLink
              component={RouterLink}
              to={"/secundario/" + trimSubject + "/decimo"}
            >
              <MenuItem>10º ano</MenuItem>
            </MdLink>
            <MdLink
              component={RouterLink}
              to={"/secundario/" + trimSubject + "/decimoprimeiro"}
            >
              <MenuItem>11º ano</MenuItem>
            </MdLink>

            <MdLink
              component={RouterLink}
              to={"/secundario/" + trimSubject + "/decimosegundo"}
            >
              <MenuItem>12º ano</MenuItem>
            </MdLink>
          </>
        ) : (
          <>
            <MdLink component={RouterLink} to={"/secundario/" + trimSubject + "/decimo"}>
              <MenuItem>10º ano</MenuItem>
            </MdLink>
            <MdLink
              component={RouterLink}
              to={"/secundario/" + trimSubject + "/decimoprimeiro"}
            >
              <MenuItem>11º ano</MenuItem>
            </MdLink>{" "}
          </>
        )}
      </Menu>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(5),
  },
}));

export default SubjectCard;
