import React, { Component } from 'react';
import PropTypes from 'prop-types';

function Library (props) {
  return (
    <div className="library container">
      <ul className="list-group">
        {props.songList.map((song, index) => {
          return <li className="list-group-item" key={index}>
          {song.songName}
          <audio autoPlay="autoplay" preload="preload" controls="controls">
            <source src={song.downloadURL} />
          </audio>
          </li>
        })}
      </ul>
    </div>
  );
}

Library.propTypes = {
  songList: PropTypes.array.isRequired
}

export default Library;
