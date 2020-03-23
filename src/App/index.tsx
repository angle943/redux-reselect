import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";

import Todos from "Todos";
import TodoCategory from "store/TodoCategory";
import "./App.css";

const App = function () {
  return (
    <Router>
      <div className="App">
        <div className="App__top">
          <NavLink to="/" exact>
            All
          </NavLink>
          <NavLink to="/react">React</NavLink>
          <NavLink to="/redux">Redux</NavLink>
          <NavLink to="/typescript">Typescript</NavLink>
        </div>

        <Switch>
          <Route path="/" exact>
            <Todos />
          </Route>
          <Route path="/react">
            <Todos category={TodoCategory.React} />
          </Route>
          <Route path="/redux">
            <Todos category={TodoCategory.Redux} />
          </Route>
          <Route path="/typescript">
            <Todos category={TodoCategory.Typescript} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
