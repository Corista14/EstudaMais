import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from "./components/About/About";
import Dashboard from "./components/Dashboard/Dashboard";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import SearchProfile from "./components/SearchProfile/SearchProfile";
import SignUp from "./components/SignUp/SignUp";
import Bg11 from "./components/Subjects/_11/Bg11";
import Fq11 from "./components/Subjects/_11/Fq11";
import Mat11 from "./components/Subjects/_11/Mat11";
import Pt11 from "./components/Subjects/_11/Pt11";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute path="/add-resource" component={Dashboard} />
          <PrivateRoute path="/profile" component={Profile} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <PrivateRoute path="/mat11" component={Mat11} />
          <PrivateRoute path="/bg11" component={Bg11} />
          <PrivateRoute path="/fq11" component={Fq11} />
          <PrivateRoute path="/pt11" component={Pt11} />
          <PrivateRoute path="/search-profile" component={SearchProfile} />
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
