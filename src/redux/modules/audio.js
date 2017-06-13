const STORE_SONGS = 'STORE_SONGS';
const GET_SONG_PATH = 'GET_SONG_PATH';
const IS_PLAYING = 'IS_PLAYING';

const initialState = {
  songList: [],
  isPlaying: false,
  currentTime: 0,
  currentVolume: 30,
  currentSong: ''
}

export function storeSongs (list) {
  return {
    type: STORE_SONGS,
    list
  }
}

export function getSongPath (song) {
  return {
    type: GET_SONG_PATH,
    song
  }
}

export function isPlaying () {
  return {
    type: IS_PLAYING
  }
}

export default function audio (state = initialState, action) {
  switch (action.type) {
    case STORE_SONGS :
      return {
        ...state,
        songList: action.list
      }
    case GET_SONG_PATH:
      return {
        ...state,
        currentSong: action.song.downloadURL
      }
    case IS_PLAYING: {
      return {
        ...state,
        isPlaying: !state.isPlaying
      }
    }
    default:
      return state
  }
}
