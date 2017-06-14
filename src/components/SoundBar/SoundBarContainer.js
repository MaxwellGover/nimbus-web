import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SoundBar from './SoundBar';
import ReactPlayer from 'react-player';
import { isPlaying, songVolume, songDuration, songProgress } from '~/redux/modules/audio';

class SoundBarContainer extends Component {
  static propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    currentSongUrl: PropTypes.string.isRequired
  }

  constructor() {
    super();

    this.state = {
      songUrl: ''
    }

    this.playSong = this.playSong.bind(this);
    this.setVolume = this.setVolume.bind(this);
    this.getCurrentSongDuration = this.getCurrentSongDuration.bind(this);
    this.getCurrentSongProgress = this.getCurrentSongProgress.bind(this);
  }

  playSong() {
    this.props.dispatch(isPlaying(this.props.currentSongUrl));
  }

  setVolume(value) {
    if (value >= 0 && value <= 100) {
      const volume = value / 100;

      this.props.dispatch(songVolume(volume));
    }
  }

  getCurrentSongDuration(duration) {
    this.props.dispatch(songDuration(duration));
  }

  getCurrentSongProgress(progress) {
    this.props.dispatch(songProgress(progress.playedSeconds));
  }

  render () {
    return (
      <div>
        <ReactPlayer
          url={this.props.currentSongUrl}
          playing={this.props.isPlaying}
          volume={this.props.currentSongVolume}
          onProgress={this.getCurrentSongProgress}
          onDuration={this.getCurrentSongDuration} />
        <SoundBar
          isPlaying={this.props.isPlaying}
          playSong={this.playSong}
          setVolume={this.setVolume} />
      </div>
    );
  }
}

function mapStateToProps ({audio}) {
  return {
    songList: audio.songList,
    isPlaying: audio.isPlaying,
    currentSongUrl: audio.currentSongUrl,
    currentSongVolume: audio.currentSongVolume,
    currentSongDuration: audio.currentSongDuration,
    currentSongProgress: audio.currentSongProgress
  }
}

export default connect(mapStateToProps)(SoundBarContainer);
