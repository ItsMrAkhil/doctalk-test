/*
 *
 * HomePage actions
 *
 */

import {
  DEFAULT_ACTION,
  SERACH_USERS,
  CHANGE_TEXT,
  SERACH_USERS_SUCCESS,
  SERACH_USERS_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function searchGitHubUsers() {
  return {
    type: SERACH_USERS,
  };
}

export function searchGitHubUsersError(response) {
  return {
    type: SERACH_USERS_ERROR,
    payload: response,
  };
}

export function searchGitHubUsersSuccess(response) {
  return {
    type: SERACH_USERS_SUCCESS,
    payload: response,
  };
}

export function changeText(val) {
  return {
    type: CHANGE_TEXT,
    payload: val,
  };
}
