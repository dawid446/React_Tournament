import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Tournament from './compontents/Tournament';
import Match from './compontents/Match';

class App extends Component {
  render() {
    return (
      <div className="App-header">
        <Router>
          <div>
          <Route exact path='/' component={Tournament}/>
          <Route path='/tournament_matches/:iteamId' component={Match}/>
          </div>

        </Router>
      </div>
    );
  }
}

export default App;
