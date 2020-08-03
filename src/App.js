import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Home from "./containers/Home";
import SignUp from "./containers/SignUp";
import LogIn from "./containers/LogIn";
import Characters from "./containers/Characters";
import CharacterComics from "./containers/CharacterComics";
import Comics from "./containers/Comics";
import Favorites from "./containers/Favorites";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/characters/:id/comics">
            <CharacterComics />
          </Route>
          <Route path="/characters">
            <Characters />
          </Route>
          <Route path="/comics">
            <Comics />
          </Route>
          <Route path="/favorites">
            <Favorites />
          </Route>
          <Route path="/sign_up">
            <SignUp />
          </Route>
          <Route path="/log_in">
            <LogIn />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
