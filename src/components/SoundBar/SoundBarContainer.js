import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SoundBar from './SoundBar';
import buzz from 'buzz';

class SoundBarContainer extends Component {
  static propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    currentSong: PropTypes.string.isRequired
  }
  render () {
    return (
      <SoundBar isPlaying={this.props.isPlaying}/>
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
