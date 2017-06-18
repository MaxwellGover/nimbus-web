import React from 'react';
import PropTypes from 'prop-types';
import './Library.css';

function Library (props) {
  return (
    <ul className="library list-group">
      {props.songList.map((song, index) => {
        return <li
          className={`list-group-item ${song.downloadURL === props.currentSongUrl ?
                  'active': ''}`}
          key={index}
          onClick={() => props.handleSongClick({
            downloadURL: song.downloadURL,
            songName: song.songName
          })}
          onMouseEnter={() => props.mouseEnter()}
          onMouseLeave={() => props.mouseExit()}>
        {song.songName}
        </li>
      })}
    </ul>
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
