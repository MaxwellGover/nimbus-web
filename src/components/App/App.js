import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SignUp } from '~/views/SignUp';
import { SignIn } from '~/views/SignIn';
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
  signOut = () => {
    firebaseAuth.signOut().then(() => {
      // Sign-out successful.
      console.log('Logged out')
    }).catch(function(error) {
      // An error happened.
      console.warn(error)
    })
  }
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={SignUp}/>
          <Route exact path="/login" component={SignIn}/>
          <Route exact path="/home" component={HomeContainer}/>
        </div>
      </Router>
    );
  }
}



export default connect()(App);
