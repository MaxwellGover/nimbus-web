import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Header.css';

function Header (props) {
  let text = props.text || "Available Tracks";
  return props.tracklistLoaded ? (
        <div className="header">
          <p className="header__header-text">{text}</p>
        </div>
    ) : null;
}

function mapStateToProps ({audio}) {
  return {
      tracklistLoaded: audio.songList.length > 0
  }
}

export default connect(mapStateToProps)(Header);
// export default Header;
