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
import React, { useState, useEffect } from "react";
import MyAppBar from "../components/AppBar/AppBar";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Alert from "@material-ui/lab/Alert";

function Login() {
  const classes = useStyles();
  const [transitionChecked, setTransitionChecked] = useState(false);
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      await login(email, password);

      history.push("/");
    } catch (error) {
      setError(error.message)
      console.log(error.message);
    }

    setLoading(false);
  }

  useEffect(() => {
    setTransitionChecked(true);
  }, []);

  return (
    <div>
      <MyAppBar description="Login" />
      <Grow in={transitionChecked}>
        <Container maxWidth="sm" className={classes.container}>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} variant="h5">
                Bem-Vindo de novo!
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
                    placeholder="Insere a tua Palavra-Passe"
                  />
                </div>

                <div className={classes.button}>
                  <Button
                    disabled={loading}
                    onClick={handleSubmit}
                    type="submit"
                    fullWidth
                    variant="outlined"
                    color="primary"
                  >
                    Entrar
                  </Button>
                </div>
              </form>

              <Typography className={classes.registerText}>
                Ainda não tens uma conta?{" "}
                <Link to="/register" className={classes.link}>
                  Regista-te!
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

export default Login;
