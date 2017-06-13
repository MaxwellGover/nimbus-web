import { firebaseAuth, db } from '~/config/constants';
import { storeSongs } from '~/redux/modules/audio';

const AUTHENTICATING = 'AUTHENTICATING';
const NOT_AUTHED = 'NOT_AUTHED';
const IS_AUTHED = 'IS_AUTHED';

function authenticating () {
  return {
    type: AUTHENTICATING
  }
}

export function notAuthed () {
  return {
    type: NOT_AUTHED
  }
}

export function isAuthed (user) {
  return {
    type: IS_AUTHED,
    user
  }
}

export function createUser (formData, push) {
  return function (dispatch, getState) {
    dispatch(authenticating());
    const email = formData.email;
    const password = formData.password;
    const displayName = formData.displayName;

    firebaseAuth.createUserWithEmailAndPassword(email, password).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.warn(`${errorCode}: ${errorMessage}`);
    }).then(() => {
      var user = firebaseAuth.currentUser;

      db.ref('/users/' + user.uid).set({
        username: formData.username,
        displayName: formData.displayName,
        uid: user.uid
      })
      dispatch(isAuthed({
        uid: user.uid,
        name: displayName
      }));
      push('/home');

    }).catch((error) => {
      console.warn('Error in createUser callback', error)
    });
  }
}

export function loginUser (credentials, push) {
  return function (dispatch, getState) {
    dispatch(authenticating());
    const email = credentials.email;
    const password = credentials.password;

    firebaseAuth.signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.warn(`${errorCode}: ${errorMessage}`);
      // ...
    }).then(() => {
      var user = firebaseAuth.currentUser;
      var songsRef = db.ref(`users/${user.uid}/availableTracks/`);
      var songList = [];

      songsRef.once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          const song = childSnapshot.val();
          console.log(song)
          songList.push(song);
        });
      }).then(() => {
        dispatch(storeSongs(songList))
      })

      db.ref(`users/${user.uid}/displayName`).once('value').then(snapshot => {
        dispatch(isAuthed({
          uid: user.uid,
          name: snapshot.val()
        }))
        push('/home');
      })
    }).catch((error) => {
      console.warn('Error in createUser callback', error)
    });
  }
}

const initialState = {
  isAuthed: false,
  isAuthenticating: false,
  uid: '',
  displayName: ''
};

export default function authentication (state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATING :
      return {
        ...state,
        isAuthenticating: true
      }
    case NOT_AUTHED :
      return {
        isAuthenticating: false,
        isAuthed: false,
        uid: '',
        displayName: ''
      }
      case IS_AUTHED :
        return {
          isAuthenticating: false,
          isAuthed: true,
          uid: action.user.uid,
          displayName: action.user.name
        }
    default :
      return state
  }
};
