import React from 'react';
import PropTypes from 'prop-types';
import InputRange from 'react-input-range';
import './SoundBar.css';

function SoundBar (props) {
  function formatDuration(duration) {
    // snippet from this SO
    // https://stackoverflow.com/questions/1322732/convert-seconds-to-hh-mm-ss-with-javascript
    return new Date(duration * 1000).toISOString().substr(14,5); //(11, 8) --> with hour
  }
  let speakerSymbol = (
      <a href="#" onClick={props.toggleMute}>
        <i className={`soundbar_volume-icon fa ${props.isMuted ? 'fa-volume-off' : 'fa-volume-up'}`} aria-hidden="true"></i>
      </a>
  );

  return (
    <div className="soundbar">
      <div className="container">
        <div className="soundbar_currently-playing">

        </div>
        <div className="soundbar_input-range-wrapper">
          <div className="soundbar_main-controls">
            <i className="soundbar_back-icon fa fa-step-backward" aria-hidden="true"></i>
            <a href="#" onClick={props.playSong} >
            {props.isPlaying === true
              ? <i className="soundbar_pause-icon fa fa-pause-circle-o fa-2x" aria-hidden="true"></i>
              : <i className="soundbar_play-icon fa fa-play-circle-o fa-2x" aria-hidden="true"></i>}
            </a>
            <i className="soundbar_forward-icon fa fa-step-forward" aria-hidden="true"></i>
          </div>
          <InputRange
            minValue={0}
            maxValue={props.currentSongDuration || 0.01}
            value={props.songLoaded ? props.played : 0}
            formatLabel={(value => `${formatDuration(value)}`)}
            onChange={value => props.setPlaybackPosition(value)}
            onChangeComplete={value => {
              console.log('change complete', value);
              // this.setState({ seeking: false });
              // this.setPlaybackPosition(value);
              props.onSeekMouseUp(value);
            }}
            onChangeStart={
              value => {
                console.log('change start', value);
                props.onSeekMouseDown(value);
              }
            }
          />
        </div>
        <div className="soundbar_volume">
          {speakerSymbol}
          <InputRange
            minValue={0}
            maxValue={100}
            formatLabel={value => ''}
            value={props.currentSongVolume * 100}
            onChange={value => props.setVolume(value)}
          />
        </div>
      </div>
    </div>
    /*
    <div className="soundbar">
      <div className="container">
        <div className="soundbar__current-song">
          <p className="soundbar__currently-playing-help">Currently playing</p>
          <p className="soundbar__song-name">{props.currentSongName}</p>
        </div>
        <div className="soundbar__main-controls">
          <a href="#"  onClick={props.prevTrack}>
            <i className="soundbar__control-buttons fa fa-step-backward" aria-hidden="true"></i>
          </a>
          <a href="#" onClick={props.playSong} >
          {props.isPlaying === true
            ? <i className="soundbar__control-buttons fa fa-pause" aria-hidden="true"></i>
            : <i className="soundbar__control-buttons fa fa-play" aria-hidden="true"></i>}
          </a>
          <a href="#" onClick={props.nextTrack}>
            <i className="soundbar__control-buttons fa fa-step-forward" aria-hidden="true"></i>
          </a>
        </div>
        <div className="soundbar__currently-playing">
          <div className="soundbar__seek-control">
            <InputRange
                minValue={0}
                maxValue={props.currentSongDuration || 0.01}
                value={props.songLoaded ? props.played: 0}
                formatLabel={value => `${formatDuration(value)}`}
                onChange={value => props.setPlaybackPosition(value)}
                onChangeComplete={value => {
                    console.log('change complete', value);
                    // this.setState({ seeking: false });
                    // this.setPlaybackPosition(value);
                    props.onSeekMouseUp(value);
                }}
                onChangeStart={
                    value => {
                        console.log('change start', value);
                        props.onSeekMouseDown(value);
                    }
                }
                />
          </div>
        </div>
        <div className="soundbar__volume">
          {speakerSymbol}
          <div className="soundbar__progress-volume">
            <InputRange
                minValue={0}
                maxValue={100}
                formatLabel={value => ''}
                value={props.currentSongVolume * 100}
                onChange={value => props.setVolume(value)}
            />
          </div>
          <span className="input-range__label soundbar__volume-label">
            {Math.round(props.currentSongVolume * 100, 0)}
          </span>
        </div>
      </div>
    </div>
    */
  );
}

SoundBar.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  played: PropTypes.number.isRequired,
  currentSongDuration: PropTypes.number.isRequired,
  currentSongVolume: PropTypes.number.isRequired,
  playSong: PropTypes.func.isRequired
}

export default SoundBar;
