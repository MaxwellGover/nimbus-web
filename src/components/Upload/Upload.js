import React from 'react';
import PropTypes from 'prop-types';
import './Upload.css';

function Upload (props) {
  return (
    <div className="upload">
      <label className="upload__button btn btn-primary">
        Upload a song <input className="upload__input" type="file" onChange={(e) => props.uploadSong(e)}/>
      </label>
      <div className="upload__percent-complete">
        <h5 style={{color: '#00FF00'}}>{Math.floor(props.percentage)}%</h5>
      </div>
    </div>
  );
}

Upload.propTypes = {
  percentage: PropTypes.number.isRequired,
  uploadSong: PropTypes.func.isRequired
}

export default Upload;
