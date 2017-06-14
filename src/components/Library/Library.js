import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Library.css';

function Library (props) {
  return (
    <div className="library">
      <div className="library__library-left">
        <div className="library__header-banner">
          <h4 className="library__header">Available Tracks</h4>
        </div>
        <ul className="library__song-list list-group">
          {props.songList.map((song, index) => {
            return <li
              className="list-group-item"
              key={index}
              onClick={() => props.handleSongClick(song.downloadURL)}
              onMouseEnter={() => props.mouseEnter()}
              onMouseLeave={() => props.mouseExit()}>
            {song.songName}
            </li>
          })}
        </ul>
      </div>
      <div className="library__side-bar">
        <h4>This is a sidebar which I will turn into its own component</h4>
      </div>
    </div>
  );
}

Library.propTypes = {
  songList: PropTypes.array.isRequired,
  handleSongClick: PropTypes.func.isRequired,
  mouseInside: PropTypes.bool.isRequired,
  mouseEnter: PropTypes.func.isRequired,
  mouseExit: PropTypes.func.isRequired
}

export default Library;
