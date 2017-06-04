import React from 'react';
import PropTypes from 'prop-types';
import './Upload.css';
import numeral from 'numeral';

function Upload (props) {
  return (
    <div className="upload jumbotron">
      <label className="upload__button btn btn-primary">
        Upload a song <input className="upload__input" type="file" onChange={(e) => props.uploadSong(e)}/>
      </label>
      <div className="upload__progress-wrapper progress">
        <div className="progress-bar upload__progress-bar" role="progressbar" style={{width: props.percentage + '%', height: '35px'}} aria-valuenow={Math.floor(props.percentage)} aria-valuemin="0" aria-valuemax="100"></div>
      </div>
      <div className="upload__percent-complete">
        <h1 style={{color: '#00FF00'}}>{Math.floor(props.percentage)}%</h1>
      </div>
    </div>
  );
}

Upload.propTypes = {
  percentage: PropTypes.number.isRequired,
  uploadSong: PropTypes.func.isRequired
}

export default Upload;
