import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MovieDetails from "./MovieDetails";
import App from "../App";
import TV from "./TV";
import TvDetails from "./TvDetails";

function Navigation() {
  return (
    <Router>
      <Switch>
        <Route path="/tv/:id" children={<TvDetails />} />
        <Route path="/tv" children={<TV />} />
        <Route path="/:id" children={<MovieDetails />} />
        <Route path="/" children={<App />} />
      </Switch>
    </Router>
  );
}

export default Navigation;
