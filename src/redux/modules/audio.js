const GET_SONG_PATH = 'GET_SONG_PATH';
const IS_PLAYING = 'IS_PLAYING';

const initialState = {
  isPlaying: false,
  isPaused: false,
  currentTime: 0,
  currentSong: ''
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
    case GET_SONG_PATH:
      return {
        ...state,
        currentSong: action.song.downloadURL
      }
    case IS_PLAYING: {
      return {
        ...state,
        isPlaying: true
      }
    }
    default:
      return state
  }
}
