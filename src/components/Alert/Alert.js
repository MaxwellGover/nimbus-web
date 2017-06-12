import React from 'react';
import PropTypes from 'prop-types';

function Alert (props) {
  return (
    <div className="alert alert-success" role="alert">
      <strong>Well done!</strong> You successfully read <a href="#" className="alert-link">this important alert message</a>.
    </div>
  );
}

export default Alert;
