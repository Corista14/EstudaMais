import React from "react";
import Login from "./views/Login";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./views/Register";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./PrivateRoute";
import MyHome from "./views/Home";
import Landing from "./views/Landing";
import Profile from "./views/Profile";
import Secundario from "./views/Secundario";
import Basico from "./views/Basico";
import Mat10 from "./views/Subject/Matematica/Mat10";
import Mat11 from "./views/Subject/Matematica/Mat11";
import Mat12 from "./views/Subject/Matematica/Mat12";
import Fq10 from "./views/Subject/FQA/Fq10";
import Fq11 from "./views/Subject/FQA/Fq11";
import BgGeo10 from "./views/Subject/BG_GEO/BgGeo10";
import BgGeo11 from "./views/Subject/BG_GEO/BgGeo11";
import Filo11 from "./views/Subject/Filosofia/Filo11";
import Filo10 from "./views/Subject/Filosofia/Filo10";
import Pt10 from "./views/Subject/PT/Pt10";
import Pt11 from "./views/Subject/PT/Pt11";
import Pt12 from "./views/Subject/PT/Pt12";
import Cn5 from "./views/Subject/CN/Cn5";
import Cn6 from "./views/Subject/CN/Cn6";
import About from "./views/About";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/about" component={About} />
            <Route path="/landing" component={Landing} />
            <PrivateRoute exact path="/" component={MyHome} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute exact path="/secundario" component={Secundario} />
            <PrivateRoute exact path="/basico" component={Basico} />

            {/** MATEMÁTICA */}
            <PrivateRoute
              path="/secundario/matemática a/decimo"
              component={Mat10}
            />
            <PrivateRoute
              path="/secundario/matemática a/decimoprimeiro"
              component={Mat11}
            />
            <PrivateRoute
              path="/secundario/matemática a/decimosegundo"
              component={Mat12}
            />

            {/** FQA */}
            <PrivateRoute path="/secundario/fqa/decimo" component={Fq10} />
            <PrivateRoute
              path="/secundario/fqa/decimoprimeiro"
              component={Fq11}
            />

            {/** BG GEO */}
            <PrivateRoute
              path="/secundario/biologia e geologia/decimo"
              component={BgGeo10}
            />
            <PrivateRoute
              path="/secundario/biologia e geologia/decimoprimeiro"
              component={BgGeo11}
            />

            {/** Filosofia */}
            <PrivateRoute
              path="/secundario/filosofia/decimo"
              component={Filo10}
            />
            <PrivateRoute
              path="/secundario/filosofia/decimoprimeiro"
              component={Filo11}
            />

            {/** Português */}
            <PrivateRoute
              path="/secundario/português/decimo"
              component={Pt10}
            />
            <PrivateRoute
              path="/secundario/português/decimoprimeiro"
              component={Pt11}
            />

            <PrivateRoute
              path="/secundario/português/decimosegundo"
              component={Pt12}
            />

            {/** Ciências Naturais */}
            <PrivateRoute
              path="/basico/ciências naturais/quinto"
              component={Cn5}
            />
            <PrivateRoute
              path="/basico/ciências naturais/sexto"
              component={Cn6}
            />
          </Switch>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

const theme = createMuiTheme({
  typography: {
    fontFamily: "Poppins",
  },
  palette: {
    primary: {
      main: "#00796b",
    },
    secondary: {
      main: "#339388",
    },
  },
});

export default App;
