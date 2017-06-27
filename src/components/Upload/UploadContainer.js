import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Upload from './Upload';
import { storageRef, db } from '~/config/constants';
import { formatFileName } from '~/api';
import { storeSongs } from '~/redux/modules/audio';

class UploadContainer extends Component {
  static propTypes = {
    uid: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);

    this.state = {
      percentage: 0
    }
  }
  uploadSong = (e) => {
    console.log('running...');
    const file = e.target.files[0];
    // TODO: Check file names. If they are the same. Prompt user that there is already a track w/ that name.
    const audioRef = storageRef.child('audio/' + file.name);
    const task = audioRef.put(file);

    task.on('state_changed', function(snapshot){
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      this.setState(() => ({
        percentage: progress
      }))
    }.bind(this), function(error) {

    }, function() {
      const downloadURL = task.snapshot.downloadURL;
      const songName = formatFileName(file.name);
      console.log(file)
      db.ref(`users/${this.props.uid}/availableTracks/`).push({
        songName,
        downloadURL
      }).then(() => {
        const songsRef = db.ref(`users/${this.props.uid}/availableTracks/`);
        let songList;

        // Update song list after upload.
        songsRef.once('value', snapshot => {
          const data = snapshot.val();
          songList = Object.keys(data).map(id => {
            return {
              songName: data[id].songName,
              downloadURL: data[id].downloadURL
            }
          });
        }).then(() => {
          this.props.dispatch(storeSongs(songList))
        })
      })

      this.setState({
        percentage: 0
      })
    }.bind(this));
  }
  render () {
    return (
      <Upload
        percentage={this.state.percentage}
        uploadSong={(e) => this.uploadSong(e)}/>
    );
  }
}

function mapStateToProps({authentication}) {
  return {
    uid: authentication.uid
  }
}

export default connect(mapStateToProps)(UploadContainer);
