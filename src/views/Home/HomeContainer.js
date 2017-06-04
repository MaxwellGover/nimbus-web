import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firebaseAuth } from '~/config/constants';
import Home from './Home';

class HomeContainer extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    uid: PropTypes.string.isRequired
  }
  signOut = () => {
    firebaseAuth.signOut().then(() => {
      // Sign-out successful.
      const push = this.props.history.push;
      push('/');
    }).catch((error) => {
      // An error happened.
    });
  }
  render () {
    console.log(this.props.uid)
    return (
      <Home signOut={this.signOut}/>
    );
  }
}

function mapStateToProps ({authentication}) {
  return {
    uid: authentication.uid
  }
}

export default connect(mapStateToProps)(HomeContainer);
