const STORE_SONGS = 'STORE_SONGS';

const initialState = {
  songList: []
}

export function storeSongs (list) {
  return {
    type: STORE_SONGS,
    list
  }
}

export default function library (state = initialState, action) {
  switch(action.type) {
    case STORE_SONGS :
      return {
        songList: action.list
      }
    default:
      return state
  }
}
