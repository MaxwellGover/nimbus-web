import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Library from './Library';
import { db } from '~/config/constants';

class LibraryContainer extends Component {
  static propTypes = {
    uid: PropTypes.string.isRequired
  }
  constructor(props) {
    super(props);

    this.state = {
      songList: []
    }
  }
  componentDidMount () {
    const ref = db.ref(`users/${this.props.uid}/availableTracks/`);
    // Get users songs
    ref.once('value', (snapshot) => {
      console.log(snapshot);
      console.log(this.props.uid)
      snapshot.forEach((childSnapshot) => {
        var childKey = childSnapshot.key;
        var songs = childSnapshot.val();
        console.log(songs);
        this.setState(() => {
          songList: this.state.songList.push(songs);
        })
      });
    });
  }
  render () {
    return (
      <Library songList={this.state.songList}/>
    );
  }
}

function mapStateToProps ({ authentication }) {
  return {
    uid: authentication.uid
  }
}

export default connect(mapStateToProps)(LibraryContainer);
