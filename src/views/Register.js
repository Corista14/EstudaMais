import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Container,
  Typography,
  makeStyles,
  TextField,
  Divider,
  Button,
  Grow,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import MyAppBar from "../components/AppBar/AppBar";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Register() {
  const classes = useStyles();
  const [transitionChecked, setTransitionChecked] = useState(false);
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const history = useHistory();

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleConfirmPasswordChange(e) {
    setConfirmPassword(e.target.value);
  }

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError("As palavras passes não coincidem");
    }

    try {
      setLoading(true);
      await signup(email, password, username);

      history.push("/");
    } catch (error) {
      setError(error.message)
    }

    setLoading(false);
  }

  useEffect(() => {
    setTransitionChecked(true);
  }, []);

  return (
    <div>
      <MyAppBar description="Registar" />

      <Grow in={transitionChecked}>
        <Container maxWidth="sm" className={classes.container}>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} variant="h5">
                Junta-te a nós!
              </Typography>
              <Divider className={classes.divider} variant="middle" />
              {error && (
                <Alert className={classes.alert} severity="error">
                  {error}
                </Alert>
              )}
              <form onSubmit={handleSubmit}>
                <div className={classes.textField}>
                  <TextField
                    value={username}
                    onChange={handleUsernameChange}
                    size="small"
                    fullWidth
                    variant="outlined"
                    label="Username..."
                    type="text"
                    placeholder="Insere o teu username"
                  />
                </div>

                <div className={classes.textField}>
                  <TextField
                    value={email}
                    onChange={handleEmailChange}
                    size="small"
                    fullWidth
                    variant="outlined"
                    label="Email..."
                    type="email"
                    placeholder="Insere o teu email"
                  />
                </div>

                <div className={classes.textField}>
                  <TextField
                    value={password}
                    onChange={handlePasswordChange}
                    size="small"
                    fullWidth
                    variant="outlined"
                    label="Palavra-Passe..."
                    type="password"
                    placeholder="Insere a tua palavra-passe"
                  />
                </div>

                <div className={classes.textField}>
                  <TextField
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    size="small"
                    fullWidth
                    variant="outlined"
                    label="Confirmar Palavra-Passe..."
                    type="password"
                    placeholder="Confirma a tua palavra-passe"
                  />
                </div>

                <div className={classes.button}>
                  <Button
                    onClick={handleSubmit}
                    type="submit"
                    fullWidth
                    disabled={loading}
                    variant="outlined"
                    color="primary"
                  >
                    Registar
                  </Button>
                </div>
              </form>

              <Typography className={classes.registerText}>
                Já tens uma conta?{" "}
                <Link to="/login" className={classes.link}>
                  Entrar
                </Link>
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </Grow>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
  card: {
    textAlign: "center",
    marginTop: theme.spacing(4),
  },
  textField: {
    margin: theme.spacing(3),
    fontSize: "16px",
  },
  divider: {
    marginTop: theme.spacing(1.5),
  },
  registerText: {
    textAlign: "left",
    margin: theme.spacing(3.5),
  },
  button: {
    margin: theme.spacing(3),
  },
  link: {
    color: "#00796b",
    textDecoration: "none",
  },
  title: {
    marginTop: theme.spacing(1),
  },
  alert: {
    margin: theme.spacing(3),
  },
}));

export default Register;
