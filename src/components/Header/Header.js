import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Header.css';

function Header (props) {
  return (
    <div className="header">
      <p className="header__text">Uploaded Songs</p>
    </div>
  ) ;
}

export default Header;
