import React from 'react';
import PropTypes from 'prop-types';
import './Upload.css';

function Upload (props) {
  return (
    <div className="upload">
      <div className="upload__percent-complete">
        <h5 style={{color: props.percentage < 1 ? '#5A5A5A' : '#A4FF00'}}>{Math.floor(props.percentage)}%</h5>
      </div>
      <label className="upload__button btn btn-primary">
        Upload a song <input className="upload__input" type="file" onChange={(e) => props.uploadSong(e)}/>
      </label>
    </div>
  );
}

Upload.propTypes = {
  percentage: PropTypes.number.isRequired,
  uploadSong: PropTypes.func.isRequired
}

export default Upload;
