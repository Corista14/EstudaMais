import React, { useState } from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Button,
  TextField,
  Dialog,
  Slide,
  IconButton,
  Typography,
  makeStyles,
  Card,
  CardContent,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";
import "firebase/firestore";
import "firebase/storage";
import firebase from "firebase/app";
import addResource from "../../helpers/addResource";
import useUser from "../../hooks/useUser";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AddResourceModal({ open, onClose }) {
  const classes = useStyles();

  const db = firebase.firestore();
  const { user } = useUser();
  const [file, setFile] = useState();
  const [prevDownloads, setPrevDownloads] = useState(0);
  const [year, setYear] = useState("");
  const [subject, setSubject] = useState("");
  const [resourceName, setResourceName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);

  async function getPrevDownloads() {
    const query = await db.collection("resource")
      .where("name", "==", resourceName)
      .where("author", "==", user.username)
      .where("year", "==", year)
      .where("subject", "==", subject)
      .get();
    for (const resource of query.docs) {
      const newData = resource.data()
      setPrevDownloads(newData.downloads)
    }
  }

  function handleFileChange(e) {
    const newFile = e.target.files[0];
    setFile(newFile);
  }

  function handleYearChange(e) {
    setYear(e.target.value);
  }

  function handleResourceNameChange(e) {
    setResourceName(e.target.value);
  }

  function handleSubjectChange(e) {
    setSubject(e.target.value);
  }

  async function sendResource(e) {
    e.preventDefault();
    getPrevDownloads();
    if (
      file !== undefined &&
      year !== "" &&
      subject !== "" &&
      resourceName !== ""
    ) {
      e.preventDefault();
      console.log(file);
      setIsDone(false);
      setLoading(true);
      await addResource(year, subject, user.username, resourceName, file, prevDownloads);
      setIsDone(true);
      setLoading(false);
    }
  }

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={onClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color="inherit" onClick={onClose}>
              <Close />
            </IconButton>
            <Typography className={classes.title} variant="h6">
              Adicioanar um Recurso
            </Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth="sm" className={classes.container}>
          <Card elevation={8} className={classes.card}>
            <CardContent>
              {isDone ? (
                <Alert severity="success">
                  Recurso Adicionado com sucesso!
                </Alert>
              ) : null}
              <form onSubmit={sendResource}>
                <FormControl fullWidth className={classes.formControl}>
                  <TextField
                    value={resourceName}
                    onChange={handleResourceNameChange}
                    fullWidth
                    label="Nome do recurso..."
                    type="text"
                    placeholder="Insere o nome do recurso"
                  />
                </FormControl>

                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel>Ano Escolar</InputLabel>
                  <Select
                    defaultValue=""
                    fullWidth
                    value={year}
                    onChange={handleYearChange}
                  >
                    <MenuItem value="5º">5º</MenuItem>
                    <MenuItem value="6º">6º</MenuItem>
                    <MenuItem value="10º">10º</MenuItem>
                    <MenuItem value="11º">11º</MenuItem>
                    <MenuItem value="12º">12º</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel>Disciplina</InputLabel>
                  <Select
                    defaultValue=""
                    fullWidth
                    value={subject}
                    onChange={handleSubjectChange}
                  >
                    <MenuItem value="Ciências Naturais">
                      {"Ciências Naturais (Só para o 5º e 6º ano)"}
                    </MenuItem>
                    <MenuItem value="Matemática A">Matemática A</MenuItem>
                    <MenuItem value="Física e Química A">
                      Física e Química A
                    </MenuItem>
                    <MenuItem value="Biologia e Geologia">
                      Biologia e Geologia
                    </MenuItem>
                    <MenuItem value="Filosofia">Filosofia</MenuItem>
                    <MenuItem value="Filosofia">Português</MenuItem>
                  </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                  <input
                    className={classes.input}
                    id="contained-button-file"
                    type="file"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="contained-button-file">
                    <Box textAlign="left">
                      <Button
                        fullWidth
                        variant="text"
                        color="inherit"
                        component="span"
                      >
                        Carregar Ficheiro
                      </Button>
                    </Box>
                  </label>
                </FormControl>

                <div className={classes.button}>
                  <Button
                    onClick={sendResource}
                    type="submit"
                    fullWidth
                    variant="outlined"
                    color="primary"
                    disabled={loading ? true : false}
                  >
                    {loading ? "A Adicionar..." : "Adicionar"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </Container>
      </Dialog>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  textField: {
    margin: theme.spacing(3),
    fontSize: "16px",
  },
  divider: {
    marginTop: theme.spacing(1.5),
  },
  button: {
    margin: theme.spacing(3),
  },
  card: {
    textAlign: "center",
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
  },
  formControl: {
    marginTop: theme.spacing(3),
  },
  input: {
    display: "none",
  },
}));

export default AddResourceModal;
