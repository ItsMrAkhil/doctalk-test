import { call, put, select, takeLatest } from 'redux-saga/effects';
import { SERACH_USERS } from './constants';

import { searchGitHubUsersError, searchGitHubUsersSuccess } from './actions';
import request from '../../utils/request';
import selectHomePage from './selectors';

export function* getsearchUserDeatils() {
  const { text } = yield select(selectHomePage());
  const requestURL = `https://api.github.com/search/users?q=${text}+sort:followers`;

  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      credentials: 'same-origin',
    });
    yield put(searchGitHubUsersSuccess(response));
  } catch (err) {
    yield put(searchGitHubUsersError(err));
  }
}

export function* searchUserDetails() {
  yield takeLatest(SERACH_USERS, getsearchUserDeatils);
}

// Bootstrap sagas
export default [
  searchUserDetails,
];
