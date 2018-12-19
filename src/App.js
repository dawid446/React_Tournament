import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Tournament from './compontents/Tournament';

class App extends Component {
  render() {
    return (
      <div className="App-header">
        <Router>
          <Route path='/' component={Tournament}></Route>
        </Router>
      </div>
    );
  }
}

export default App;
