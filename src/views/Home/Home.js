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
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" style={{color: '#fff'}} href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Display Name
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a className="dropdown-item" href="#">Profile</a>
                <a className="dropdown-item" href="#" onClick={props.signOut}>Sign Out</a>
              </div>
            </li>
          </ul>
        </div>
        <UploadContainer />
      </nav>
      <LibraryContainer />
    </div>
  );
}

Home.propTypes = {
  signOut: PropTypes.func.isRequired
}

export default Home;
