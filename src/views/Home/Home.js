import React from 'react';
import PropTypes from 'prop-types';
import { UploadContainer } from '~/components/Upload';
import './Home.css';

function Home (props) {
  return (
    <div className="home">
      <UploadContainer />
    </div>
  );
}

Home.propTypes = {
  signOut: PropTypes.func.isRequired
}

export default Home;
