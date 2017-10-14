import { call, put, select, takeEvery } from 'redux-saga/effects';
import { SERACH_USERS_SUCCESS, SERACH_USERS } from './constants';

import { searchGitHubUsersError, searchGitHubUsersSuccess, defaultAction } from './actions';
import request from '../../utils/request';
import selectHomePage from './selectors';

export function* getsearchUserDeatils() {
  const { texts } = yield select(selectHomePage());
  const requestURL = `https://api.github.com/search/users?q=${texts[0]}+sort:followers`;

  if (texts[0]) {
    try {
      const response = yield call(request, requestURL, {
        method: 'GET',
        credentials: 'same-origin',
      });
      yield put(searchGitHubUsersSuccess(response));
    } catch (err) {
      yield put(searchGitHubUsersError(err));
    }
  } else {
    yield put(defaultAction());
  }
}

export function* searchUserDetails() {
  yield takeEvery(SERACH_USERS_SUCCESS, getsearchUserDeatils);
  yield takeEvery(SERACH_USERS, getsearchUserDeatils);
}

// Bootstrap sagas
export default [
  searchUserDetails,
];
