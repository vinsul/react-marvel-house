import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Home from "./containers/Home";
import Characters from "./containers/Characters";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/characters">
            <Characters />
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
