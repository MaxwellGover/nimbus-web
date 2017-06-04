import { firebaseAuth, db } from '~/config/constants';

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

export function isAuthed (uid) {
  return {
    type: IS_AUTHED,
    uid
  }
}

export function createUser (formData, push) {
  return function (dispatch, getState) {
    dispatch(authenticating());
    const email = formData.email;
    const password = formData.password;

    firebaseAuth.createUserWithEmailAndPassword(email, password).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
    }).then(() => {
      const user = firebaseAuth.currentUser;

      db.ref('/users/' + user.uid).set({
        username: formData.username,
        displayName: formData.displayName,
        uid: user.uid
      })
      dispatch(isAuthed(user.uid));
      push('/home');

    }).catch((error) => {
      console.warn('Error in createUser callback', error)
    });
  }
}

const initialState = {
  isAuthed: false,
  isAuthenticating: false,
  uid: ''
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
        uid: ''
      }
      case IS_AUTHED :
        return {
          isAuthenticating: false,
          isAuthed: true,
          uid: action.uid
        }
    default :
      return state
  }
};
