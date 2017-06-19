import React from 'react';
import PropTypes from 'prop-types';
import './Library.css';
// song.downloadURL === props.currentSongUrl

function Library (props) {
  return (
    <ul className="library list-group">
      {props.songList.map((song, index) => {
        return <li
          className='list-group-item'
          key={index}
          onClick={() => props.handleSongClick({
            downloadURL: song.downloadURL,
            songName: song.songName
          })}
          onMouseEnter={() => props.mouseEnter()}
          onMouseLeave={() => props.mouseExit()}>
        <p style={song.downloadURL === props.currentSongUrl ? {color: '#F4543F', margin: 0, padding: 0} : {color: '#fff', margin: 0, padding: 0}}>{song.songName}</p>
        {song.downloadURL === props.currentSongUrl ? <i className="library__music-icon fa fa-music" aria-hidden="true"></i> : null }
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
