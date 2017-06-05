import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SignUp } from '~/views/SignUp';
import { HomeContainer } from '~/views/Home';
import { firebaseAuth } from '~/config/constants';
import { isAuthed, notAuthed } from '~/redux/modules/authentication';
import './App.css';

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }
  componentDidMount () {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        this.props.dispatch(isAuthed(user.uid))
      } else {
        this.props.dispatch(notAuthed())
      }
    });
  }
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-light bg-faded">
            <h1 className="navbar-brand mb-0">Nimbus</h1>
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#">Sign Out</a>
              </li>
            </ul>
          </nav>
          <Route exact path="/" component={SignUp}/>
          <Route exact path="/home" component={HomeContainer}/>
        </div>
      </Router>
    );
  }
}



export default connect()(App);
