import React from 'react';
import PropTypes from 'prop-types';
import { UploadContainer } from '~/components/Upload';
import { LibraryContainer } from '~/components/Library';
import { SoundBarContainer } from '~/components/SoundBar';
import { Header } from '~/components/Header';
import { Side } from '~/components/Side';
import './Home.css';

function Home (props) {
    let soundbar = null;
    let player = null; //header + container

    if (props.songList.length > 0) {
      // render soundbar only if there are tracks to play
      // todo: check if ux is OK
      soundbar = <SoundBarContainer />
      player = (
        <div>
          <Header />
          <LibraryContainer songList={props.songList}/>
        </div>
      );
    }
    else {
        // todo check loading flag --> avoid flicker during load!
        player = <Header text="No tracks available yet!"/>
    }

  return (
    <div className="home">
      <div className="home__sidebar-wrapper">Side</div>
      <nav className="home__nav navbar navbar-toggleable-md navbar-light bg-faded">
        <a className="navbar-brand" href="#">
          <img src="http://i.imgur.com/kZDsecU.png" width="45" height="45" alt="" />
        </a>
        <div className="home__navbar-right">
          <UploadContainer />
          <div className="home__nav-links collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" style={{color: '#fff'}} href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {props.displayName}
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <a className="dropdown-item" href="#" onClick={props.signOut}>Sign Out</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="home__header-wrapper">
        <Header />
      </div>
      <div className="home__library-wrapper">
        <LibraryContainer songList={props.songList}/>
      </div>
      { soundbar }
    </div>
    /*
    <div className="home">
      <div className="home__left">
        <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
          <a className="navbar-brand" href="#">
            <img src={require('../../images/hf.png')} width="40px" alt="logo" />
          </a>
          <div className="home__navbar-right">
            <UploadContainer />
            <div className="home__nav-links collapse navbar-collapse" id="navbarText">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" style={{color: '#fff'}} href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {props.displayName}
                  </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <a className="dropdown-item" href="#" onClick={props.signOut}>Sign Out</a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {player}
        {soundbar}
      </div>
    </div>
    */
  );
}

Home.propTypes = {
  signOut: PropTypes.func.isRequired,
  displayName: PropTypes.string.isRequired
}

export default Home;
