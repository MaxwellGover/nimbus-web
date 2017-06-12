import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SignUp } from '~/views/SignUp';
import { SignIn } from '~/views/SignIn';
import { HomeContainer } from '~/views/Home';
import { firebaseAuth, db } from '~/config/constants';
import { isAuthed, notAuthed } from '~/redux/modules/authentication';
import './App.css';

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    uid: PropTypes.string.isRequired
  }
  componentDidMount () {
    var songList = [];
    firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        const displayNameRef = db.ref(`users/${user.uid}/displayName`);

        displayNameRef.once('value').then(snapshot => {
          this.props.dispatch(isAuthed({
            uid: user.uid,
            name: snapshot.val()
          }))
        })
      } else {
        this.props.dispatch(notAuthed())
      }
    });
  }
  signOut = () => {
    firebaseAuth.signOut().then(() => {
      this.props.dispatch(notAuthed())
    }).catch((error) => {
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

function mapStateToProps ({ authentication }) {
  return {
    uid: authentication.uid
  }
}

export default connect(mapStateToProps)(App);
