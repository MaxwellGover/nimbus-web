import React from 'react';
import './Header.css';

function Header (props) {
    let text = props.text || "Available Tracks";
  return (
    <div className="header">
      <p className="header__header-text">{text}</p>
    </div>
  );
}

export default Header;
