const STORE_SONGS = 'STORE_SONGS';
const PLAY_SONG = 'PLAY_SONG';
const SET_SONG_VOLUME = 'SET_SONG_VOLUME';
const SET_SONG_DURATION = 'SET_SONG_DURATION';
const SET_SONG_PROGRESS = 'SET_SONG_PROGRESS';

const initialState = {
  songList: [],
  isPlaying: false,
  currentSongUrl: '',
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

// TODO: Should it be renamed to 'playSong'?.
export function isPlaying (url) {
  return {
    type: PLAY_SONG,
    url
  }
}

export function songVolume (volume) {
  return {
    type: SET_SONG_VOLUME,
    volume
  }
}

export function songDuration (duration) {
  return {
    type: SET_SONG_DURATION,
    duration
  }
}

export function songProgress (progress) {
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
        currentSongUrl: action.url ? action.url : state.songList[0].downloadURL
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
    default:
      return state
  }
}
