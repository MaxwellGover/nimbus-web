import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SoundBar from './SoundBar';
import ReactPlayer from 'react-player';
import { playSong, songVolume, songDuration, songProgress } from '~/redux/modules/audio';

class SoundBarContainer extends Component {
  static propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    currentSongUrl: PropTypes.string.isRequired,
    currentSongVolume: PropTypes.number.isRequired,
    currentSongDuration: PropTypes.number.isRequired,
    currentSongProgress: PropTypes.number.isRequired
  }
  constructor(props) {
    super(props);

    this.playSong = this.playSong.bind(this);
    this.setVolume = this.setVolume.bind(this);
    this.getCurrentSongDuration = this.getCurrentSongDuration.bind(this);
    this.getCurrentSongProgress = this.getCurrentSongProgress.bind(this);
  }
  convertTime = (timestamp) =>  {
    let minutes = Math.floor(timestamp / 60);
    let seconds = timestamp - (minutes * 60);
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    timestamp = minutes + ':' + seconds;
    return timestamp
  }
  playSong = () => {
    this.props.dispatch(playSong({
      downloadURL: this.props.currentSongUrl,
      songName: this.props.currentSongName
    }));
  }
  setVolume = (value) => {
    if (value >= 0 && value <= 100) {
      const volume = value / 100;

      this.props.dispatch(songVolume(volume));
    }
  }
  getCurrentSongDuration = (duration) => {
    this.props.dispatch(songDuration(duration));
  }
  getCurrentSongProgress(progress) {
    this.props.dispatch(songProgress(progress.playedSeconds));
  }
  updateSeekPercentage = () => {

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
          setVolume={this.setVolume}
          currentSongName={this.props.currentSongName}
          currentSongProgress={this.props.currentSongProgress}
          currentSongDuration={this.props.currentSongDuration}/>
      </div>
    );
  }
}

function mapStateToProps ({audio}) {
  return {
    songList: audio.songList,
    isPlaying: audio.isPlaying,
    currentSongUrl: audio.currentSongUrl,
    currentSongName: audio.currentSongName,
    currentSongVolume: audio.currentSongVolume,
    currentSongDuration: audio.currentSongDuration,
    currentSongProgress: audio.currentSongProgress
  }
}

export default connect(mapStateToProps)(SoundBarContainer);
