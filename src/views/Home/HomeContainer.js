import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firebaseAuth } from '~/config/constants';
import { pauseSong } from '../../redux/modules/audio';
import Home from './Home';

class HomeContainer extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    uid: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired
  }
  signOut = () => {
    firebaseAuth.signOut().then(() => {
      // Sign-out successful.
      const push = this.props.history.push;
      this.props.dispatch(pauseSong());
      push('/');
    }).catch((error) => {
      // An error happened.
    });
  }
  render () {
    return (
      <Home songList={this.props.songList} signOut={this.signOut} displayName={this.props.displayName}/>
    );
  }
}

function mapStateToProps ({authentication, audio}) {
  return {
    uid: authentication.uid,
    displayName: authentication.displayName,
    songList: audio.songList
  }
}

export default connect(mapStateToProps)(HomeContainer);
