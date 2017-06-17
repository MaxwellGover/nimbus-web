import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SoundBar from './SoundBar';
import ReactPlayer from 'react-player';
import { isPlaying, songVolume, songDuration, songProgress } from '~/redux/modules/audio';

class SoundBarContainer extends Component {
  static propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    currentSongUrl: PropTypes.string.isRequired,
    currentSongVolume: PropTypes.number.isRequired,
    currentSongDuration: PropTypes.number.isRequired,
    currentSongProgress: PropTypes.number.isRequired
  }

  constructor() {
    super();

    this.state = {
      songUrl: '',
      songProgress: 0,
      songDuration: 0,
      seeking: false,
      muted: false,
      previousVolume: 0
    }

    // todo -> why is binding required here?
    // with-out binding this is not referencing to SoundBarContainer instance
    // - it is referecing to soundbar instance instead.

    this.playSong = this.playSong.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
    this.setVolume = this.setVolume.bind(this);
    this.getVolume = this.getVolume.bind(this);
    this.setPlaybackPosition = this.setPlaybackPosition.bind(this);
    this.onSeekMouseDown = this.onSeekMouseDown.bind(this);
    this.onSeekMouseUp = this.onSeekMouseUp.bind(this);
    this.getCurrentSongDuration = this.getCurrentSongDuration.bind(this);
    this.getCurrentSongProgress = this.getCurrentSongProgress.bind(this);
  }

  playSong() {
    this.props.dispatch(isPlaying({
      downloadURL: this.props.currentSongUrl,
      songName: this.props.currentSongName
    }));
  }

  getVolume() {
        return this.props.currentSongVolume;
  }

  toggleMute() {
      if (!this.state.muted) {
          this.setState({
              previousVolume: this.props.currentSongVolume * 100
          });
          this.setVolume(0);
      }
      else {
          this.setVolume(this.state.previousVolume);
      }
  }

  setVolume(value) {
    // console.log('setvol', this);
    if (value >= 0 && value <= 100) {
      const volume = value / 100;

      this.props.dispatch(songVolume(volume));

      this.setState({
          muted: (volume === 0),
          currentSongVolume: volume
      });
    }
  }

  setPlaybackPosition(pos) {
      console.log('setPlaybackPosition this=', this);
      console.log('setPlaybackPosition', pos);
      if (pos >= 0 && pos <= 100) {
          let relPos = parseFloat(pos/100);
          this.player.seekTo(relPos);
      }
  }

  onSeekMouseDown(value) {
      console.log('seek start', value);
      this.setState({ seeking: true });
  }

  onSeekMouseUp(value) {
      console.log('seek stop', value);
      this.setState({ seeking: false });
      this.setPlaybackPosition(value);
  }

  getCurrentSongDuration(duration) {
    this.props.dispatch(songDuration(duration));
    this.setState({
      songDuration: duration
    })
  }

  getCurrentSongProgress(progress) {
    // TODO: Seeking not working properly --> mute during seeking
    //       & check if progress will be updated during seek
    
    // We only want to update time slider if we are not currently seeking
    // console.log('new progress', progress, this.state);
    // if (!this.state.seeking) {
    // seeking not properly handled yet --> callback onChangeComplete not triggered?!
    // seeking required -> so we can stop update progress and auto-mute playback
        this.props.dispatch(songProgress(progress.playedSeconds));
        this.setState({
          songProgress: progress
        })
    // }
  }

  render () {
    // console.log(this.props.currentSongDuration);
    // console.log(this.props.currentSongProgress);

    return (
      <div>
        <ReactPlayer
          ref={player => { this.player = player }}
          url={this.props.currentSongUrl}
          playing={this.props.isPlaying}
          volume={this.props.currentSongVolume}
          onProgress={this.getCurrentSongProgress}
          onDuration={this.getCurrentSongDuration} />
        <SoundBar
          isPlaying={this.props.isPlaying}
          playSong={this.playSong}
          setVolume={this.setVolume}
          toggleMute={this.toggleMute}
          isMuted={this.state.muted}
          setPlaybackPosition={this.setPlaybackPosition}
          onSeekMouseDown={this.onSeekMouseDown}
          onSeekMouseUp={this.onSeekMouseUp}
          currentSongName={this.props.currentSongName}
          currentSongProgress={this.props.currentSongProgress}
          currentSongDuration={this.props.currentSongDuration}
          currentSongVolume={this.props.currentSongVolume}/>
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
