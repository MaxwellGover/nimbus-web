import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Library from './Library';
import { firebaseAuth, db } from '~/config/constants';
import { storeSongs, getSongPath, isPlaying } from '~/redux/modules/audio';

class LibraryContainer extends Component {
  static propTypes = {
    uid: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
  }
  constructor (props) {
    super(props);

    this.state = {
      mouseInside: false
    }
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

function mapStateToProps ({authentication, audio}) {
  console.log(authentication)
  return {
    uid: authentication.uid,
    songList: audio.songList
  }
}

export default connect(mapStateToProps)(LibraryContainer);
