import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SoundBar from './SoundBar';
import ReactPlayer from 'react-player';

class SoundBarContainer extends Component {
  static propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    currentSong: PropTypes.string.isRequired
  }
  render () {
    return (
      <div>
        <ReactPlayer url={this.props.currentSong} playing={this.props.isPlaying} />
        <SoundBar isPlaying={this.props.isPlaying}/>
      </div>
    );
  }
}

function mapStateToProps ({audio}) {
  return {
    isPlaying: audio.isPlaying,
    currentSong: audio.currentSong
  }
}

export default connect(mapStateToProps)(SoundBarContainer);
