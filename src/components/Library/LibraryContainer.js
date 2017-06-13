import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Library from './Library';
import { firebaseAuth, db } from '~/config/constants';
import { storeSongs } from '~/redux/modules/library';
import { getSongPath, isPlaying } from '~/redux/modules/audio';

class LibraryContainer extends Component {
  static propTypes = {
    uid: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
  }
  constructor (props) {
    super(props);

    this.state = {
      songList: [],
      mouseInside: false
    }
  }
  componentDidMount () {
    console.log('user id', this.props.uid)
    const ref = db.ref(`users/${this.props.uid}/availableTracks/`);
    ref.once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const song = childSnapshot.val();
        console.log(song);
        this.setState({
          songList: this.state.songList.concat([song])
        })
      });
    });
    console.log(this.state.songList)
  }
  handleSongClick = (song) => {
    this.props.dispatch(getSongPath(song))
    this.props.dispatch(isPlaying())
  }
  mouseEnter = () => {
    this.setState({ mouseInside: true });
  }
  mouseExit = () => {
    this.setState({ mouseInside: false });
  }
  render () {
    return (
      <Library
        handleSongClick={this.handleSongClick}
        songList={this.props.songList}
        mouseInside={this.state.mouseInside}
        mouseEnter={this.mouseEnter}
        mouseExit={this.mouseExit}
      />
    );
  }
}

function mapStateToProps ({authentication, library}) {
  console.log(authentication)
  return {
    uid: authentication.uid,
    songList: library.songList
  }
}

export default connect(mapStateToProps)(LibraryContainer);
