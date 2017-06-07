import React from 'react';
import PropTypes from 'prop-types';
import { UploadContainer } from '~/components/Upload';
import { LibraryContainer } from '~/components/Library';
import './Home.css';

function Home (props) {
  return (
    <div className="home">
      <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
        <a className="navbar-brand" href="#">
          <img src="http://i.imgur.com/OHRPgRy.png" width="160px" alt="logo" />
        </a>
        <div className="home__nav-links collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#" style={{color: '#fff'}}>Display Name<span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item" onClick={props.signOut}>
              <a className="nav-link" href="#" style={{color: '#fff'}}>Sign Out</a>
            </li>
          </ul>
        </div>
      </nav>
      <UploadContainer />
      <LibraryContainer />
    </div>
  );
}

Home.propTypes = {
  signOut: PropTypes.func.isRequired
}

export default Home;
