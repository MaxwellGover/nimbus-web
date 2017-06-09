import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Library.css';

function Library (props) {
  return (
    <div className="library container">
      <h4 className="library__header">Available Tracks</h4>
      <ul className="library__list-group list-group">
        {props.songList.map((song, index) => {
          return <li className="list-group-item" key={index}>
          {song.songName}
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
