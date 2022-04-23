import React, { Component } from 'react';
import { Provider } from 'react-redux';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import '../styles/index.css';

import Wrapper from '../components/Wrapper';
import { store } from '../store';

// pages
import Login from './Login';
import Feed from './Feed';
import Transaction from './Transaction';
import About from './About';
import Profile from './profile';
import Admin from './Admin';

// Navbar on top
// sidebar and main content next to each other.
// Footer

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Wrapper>
              <Route exact path="/login" component={Login}/>
              <div className="main-content-wrapper">
                <div className="container">
                  <Route exact component={Feed} path="/" />
                  <Route exact component={Transaction}  path="/transaction/:id" />
                  <Route exact component={Profile} path="/profile/:id?" />
                  <Route exact component={About} path="/about" />
                  <Route exact component={Admin} path="/admin" />
                </div>
              </div>
              </Wrapper>
          </Switch>
        </Router>
      </Provider>
    );
  }
};
