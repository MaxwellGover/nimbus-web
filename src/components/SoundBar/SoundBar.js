import React from 'react';
import PropTypes from 'prop-types';
import './SoundBar.css';

function SoundBar (props) {
  const songProgress = (props.currentSongProgress / props.currentSongDuration) * 100;
  console.log(Math.floor(songProgress) + '%')
  return (
    <div className="soundbar">
      <div className="container">
        <div className="soundbar__current-song">
          <p className="soundbar__currently-playing-help">Currently playing</p>
          <p className="soundbar__song-name">{props.currentSongName}</p>
        </div>
        <div className="soundbar__main-controls">
          <a>
            <i className="soundbar__control-buttons fa fa-step-backward" aria-hidden="true"></i>
          </a>
          {/* TODO: Improve Play/Pause UI. */}
          <a href="#" onClick={props.playSong} >
          {props.isPlaying === true
            ? <i className="soundbar__control-buttons fa fa-pause" aria-hidden="true"></i>
            : <i className="soundbar__control-buttons fa fa-play" aria-hidden="true"></i>}
          </a>
          <a>
            <i className="soundbar__control-buttons fa fa-step-forward" aria-hidden="true"></i>
          </a>
        </div>
        <div className="soundbar__currently-playing">
          <div className="soundbar__seek-control">
            <div className="soundbar__progress progress" onClick={(event) => console.log(event.target)}>
              <div
                className="soundbar__progress-bar progress-bar"
                role="progressbar"
                style={{width: songProgress + '%'}}
                aria-valuenow={songProgress}
                aria-valuemin="0"
                aria-valuemax="1"
              >
              </div>
              <div className="thumb"
                style={{borderRadius: '50%', height: '10px', width: '10px', backgroundColor: '#fff', left: songProgress, position: 'relative', zIndex: 9000}}></div>
            </div>
          </div>
        </div>
        <div className="soundbar__volume">
          {/* TODO: improve volume bar UI */}
          <a href="#" onClick={() => props.setVolume(70)}>
            <i className="soundbar__volume-icon fa fa-volume-up" aria-hidden="true"></i>
          </a>
          <div className="soundbar__progress-volume progress">
            <div className="soundbar__progress-bar-volume progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
            <div className="soundbar_playhead-volume"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

SoundBar.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  currentSongProgress: PropTypes.number.isRequired,
  currentSongDuration: PropTypes.number.isRequired,
  playSong: PropTypes.func.isRequired
}

export default SoundBar;
