/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  CHANGE_TEXT,
  SERACH_USERS_SUCCESS,
  SERACH_USERS,
  SERACH_USERS_ERROR,
} from './constants';

const initialState = fromJS({
  text: '',
  users: [],
});

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case CHANGE_TEXT:
      return state
        .set('text', action.payload);
    case SERACH_USERS:
      return state
        .set('searching', true);
    case SERACH_USERS_SUCCESS:
      return state
        .set('searching', false)
        .set('users', fromJS(action.payload.items));
    case SERACH_USERS_ERROR:
      return state
        .set('searching', false);
    default:
      return state;
  }
}

export default homePageReducer;
