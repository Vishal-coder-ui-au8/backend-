import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';

import Nav from './component/Nav';
import HomePage from "./HOC/HomePage";
import Calculator from "./HOC/Calculator";
import Todo from "./HOC/Todo";
import Post from './HOC/post';


function App() {
  return (
    <Router>
      <Nav name />
      <Switch>
    <Route exact path='/' component={HomePage} />
    <Route exact path='/calc' component={Calculator} />
    <Route exact path='/todo' component={Todo} />
    <Route exact path='/post' component={Post} />
      </Switch>
    </Router>
  );
}

export default App;
