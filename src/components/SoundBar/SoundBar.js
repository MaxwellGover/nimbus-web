import React from 'react';
import PropTypes from 'prop-types';
import InputRange from 'react-input-range';
import './SoundBar.css';

function SoundBar (props) {
  const songProgress = props.currentSongDuration > 0 ? (props.currentSongProgress / props.currentSongDuration) * 100 : 0;
  // console.log(props.currentSongProgress, songProgress, props.currentSongDuration)

  // console.log('soundbar props', props);

  function formatDuration(duration) {
    // snippet from this SO
    // https://stackoverflow.com/questions/1322732/convert-seconds-to-hh-mm-ss-with-javascript
    return new Date(duration * 1000).toISOString().substr(14,5); //(11, 8) --> with hour
  }

  let speakerSymbol = (
      <a href="#" onClick={props.toggleMute}>
        <i className={`soundbar__volume-icon fa ${props.isMuted ? 'fa-volume-off' : 'fa-volume-up'}`} aria-hidden="true"></i>
      </a>
  );

  return (
    <div className="soundbar">
      <div className="container">
        <div className="soundbar__current-song">
          <p className="soundbar__currently-playing-help">Currently playing</p>
          <p className="soundbar__song-name">{props.currentSongName}</p>
        </div>
        <div className="soundbar__main-controls">
          <a href="#" onClick={props.prevTrack}>
            <i className="soundbar__control-buttons fa fa-step-backward" aria-hidden="true"></i>
          </a>
          {/* TODO: Improve Play/Pause UI. */}
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
                maxValue={100}
                value={songProgress}
                formatLabel={value => `${formatDuration(value/100*props.currentSongDuration)}`}
                onChange={value => props.setPlaybackPosition(value)}
                onChangeComplete={props.onSeekMouseUp}
                onChangeStart={props.onSeekMouseDown}
                />
            {/*#5da2e9
            <div className="soundbar__progress progress" onClick={(e) => props.setPlaybackPosition(getClickPosition(e).x)}>
              <div className="soundbar__progress-bar progress-bar" role="progressbar" style={{width: parseInt(songProgress) + '%'}} aria-valuenow={parseInt(songProgress)} aria-valuemin="0" aria-valuemax="100">
                <div className="thumb" onMouseDown={props.onSeekMouseDown} onSeekMouseUp={(e) => props.onSeekMouseUp(getClickPosition(e).x)}></div>
              </div>
            </div>
            */}
          </div>
        </div>
        <div className="soundbar__volume">
          {/* TODO: improve volume bar UI */}
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
  );
}

SoundBar.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  currentSongProgress: PropTypes.number.isRequired,
  currentSongDuration: PropTypes.number.isRequired,
  currentSongVolume: PropTypes.number.isRequired,
  playSong: PropTypes.func.isRequired
}

export default SoundBar;
