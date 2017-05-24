import { fromJS } from 'immutable';

import { LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN,
  TOGGLE_LOGIN_MODAL,
  CHANGE_LOGIN_FORM,
  LOGOUT,
  LOGOUT_ERROR,
  LOGOUT_SUCCESS,
  FETCH_USER_DETAILS,
  FETCH_USER_DETAILS_SUCCESS,
  FETCH_USER_DETAILS_ERROR,
} from './constants';

const initialState = fromJS({
  loggedIn: false,
  user: { },
  loginForm: {
    email: '',
    password: '',
  },
  loggingIn: false,
  showLoginModal: false,
  response: {

  },
});

export default function appReducer(state = initialState, { type, payload }) {
  switch (type) {
    case LOGIN:
      return state
        .set('response', fromJS({}))
        .set('loggingIn', true);
    case LOGIN_SUCCESS:
      return state
        .set('loginForm', initialState.get('loginForm'))
        .set('user', payload.user)
        .set('loggedIn', true)
        .set('showLoginModal', false)
        .set('loggingIn', false);
    case LOGIN_ERROR:
      return state
        .setIn(['loginForm', 'password'], '')
        .set('response', payload)
        .set('loggingIn', false);
    case TOGGLE_LOGIN_MODAL:
      return state
        .set('response', fromJS({}))
        .set('showLoginModal', !state.get('showLoginModal'));
    case CHANGE_LOGIN_FORM:
      return state
        .set('response', fromJS({}))
        .setIn(['loginForm', payload.prop], payload.value);
    case LOGOUT:
      return state
        .set('loggingOut', true);
    case LOGOUT_ERROR:
      return state
        .set('loggingOut', false);
    case LOGOUT_SUCCESS:
      return state
        .set('loggedIn', false)
        .set('user', fromJS({ }))
        .set('loggingOut', false);
    case FETCH_USER_DETAILS:
      return state
        .set('fetchingUserDetails', true);
    case FETCH_USER_DETAILS_ERROR:
      return state
        .set('fetchingUserDetails', false);
    case FETCH_USER_DETAILS_SUCCESS:
      return state
        .set('user', fromJS(payload.user))
        .set('loggedIn', true)
        .set('fetchingUserDetails', false);
    default:
      return state;
  }
}
