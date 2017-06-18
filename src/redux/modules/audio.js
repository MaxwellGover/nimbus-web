const STORE_SONGS = 'STORE_SONGS';
const PLAY_SONG = 'PLAY_SONG';
const PAUSE_SONG = 'PAUSE_SONG';
const SELECT_SONG = 'SELECT_SONG';
const SET_SONG_VOLUME = 'SET_SONG_VOLUME';
const SET_SONG_DURATION = 'SET_SONG_DURATION';
const SET_SONG_PROGRESS = 'SET_SONG_PROGRESS';
const SKIP_SONG = 'SKIP_SONG';

const initialState = {
  songList: [],
  isPlaying: false,
  currentSongUrl: '',
  currentSongName: '',
  currentSongVolume: 0.3,
  currentSongProgress: 0,
  currentSongDuration: 0,
}

export function storeSongs (list) {
  return {
    type: STORE_SONGS,
    list
  }
}

export function skipSong(direction) {
    return {
        type: SKIP_SONG,
        direction
    };
}

// TODO: Should it be renamed to 'playSong'?.
// was isPlaying --> confusing because it is not returning the isPlaying prop.
export function playSong (song) {
  console.log(song)
  return {
    type: PLAY_SONG,
    song
  }
}

export function pauseSong () {
    return {
        type: PAUSE_SONG
    }
}

export function selectSong (song) {
    return {
        type: SELECT_SONG,
        song
    }
}

export function songVolume (volume) {
  console.log('volume is', volume)
  return {
    type: SET_SONG_VOLUME,
    volume
  }
}

export function songDuration (duration) {
  console.log(duration);
  return {
    type: SET_SONG_DURATION,
    duration
  }
}

export function songProgress (progress) {
  console.log(progress);
  return {
    type: SET_SONG_PROGRESS,
    progress
  }
}

export default function audio (state = initialState, action) {
  switch (action.type) {
    case STORE_SONGS :
      return {
        ...state,
        songList: action.list
      }

    // BUG: if 'songList' is empty, it will crash the app.
    case PLAY_SONG: {
      return {
        ...state,
        isPlaying: !state.isPlaying,
        currentSongUrl: action.song.downloadURL ? action.song.downloadURL : state.songList[0].downloadURL,
        currentSongName: action.song.songName ? action.song.songName : state.songList[0].songName
      }
    }
    case PAUSE_SONG: {
        return {
            ...state,
            isPlaying: false
        }
    }
    case SELECT_SONG: {
        // similar to PLAY_SONG but forces isPlaying to true
        return {
            ...state,
            isPlaying: true,
            currentSongUrl: action.song.downloadURL ? action.song.downloadURL : state.songList[0].downloadURL,
            currentSongName: action.song.songName ? action.song.songName : state.songList[0].songName
        }
    }
    case SET_SONG_VOLUME: {
      return {
        ...state,
        currentSongVolume: action.volume
      }
    }
    case SET_SONG_DURATION: {
      return {
        ...state,
        currentSongDuration: action.duration
      }
    }
    case SET_SONG_PROGRESS: {
      return {
        ...state,
        currentSongProgress: action.progress
      }
    }
    case SKIP_SONG: {

        function findIndex(downloadURL) {
            let i=0;
            for(let song of state.songList) {
                console.log('song', song, downloadURL);
                if (song.downloadURL === downloadURL) {
                    return i;
                }
                i++;
            }
        }

        let curSong = state.currentSongUrl;
        let curPlayIndex = findIndex(curSong);
        let newSong;

        if (curPlayIndex === undefined) {
            // no sowng active
            return state;
        }

        if (action.direction === 'next') {
            // check if we're at last track --> then keep current track
            if (curPlayIndex < state.songList.length - 1) {
                curPlayIndex++;
            }
            console.log('next title', state.songList[curPlayIndex]);
        }
        else {
            if (curPlayIndex > 0) {
                curPlayIndex--;
            }
            console.log('prev title', state.songList[curPlayIndex]);
        }

        newSong = state.songList[curPlayIndex];

        return {
            ...state,
            currentSongUrl: newSong.downloadURL,
            currentSongName: newSong.songName
        }
    }
    default:
      return state
  }
}
