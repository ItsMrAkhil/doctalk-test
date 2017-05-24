import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOGIN, LOGOUT, FETCH_USER_DETAILS } from './constants';
import { loginSuccess, loginError, logoutSuccess, logoutError, fetchUserDetailsError, fetchUserDetailsSuccess } from './actions';

import request from '../../utils/request';
import { makeSelectApp } from './selectors';

export function* getLogin() {
  const { loginForm } = yield select(makeSelectApp());
  const requestURL = '/api/login';

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginForm),
      credentials: 'same-origin',
    });
    yield put(loginSuccess(response));
  } catch (err) {
    yield put(loginError(err));
  }
}
export function* loginData() {
  yield takeLatest(LOGIN, getLogin);
}

export function* getLogout() {
  const requestURL = '/api/logout';
  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      credentials: 'same-origin',
    });
    yield put(logoutSuccess(response));
  } catch (err) {
    yield put(logoutError(err));
  }
}

export function* logoutData() {
  yield takeLatest(LOGOUT, getLogout);
}

export function* getUserDetails() {
  const requestURL = '/api/user-details';
  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      credentials: 'same-origin',
    });
    yield put(fetchUserDetailsSuccess(response));
  } catch (err) {
    yield put(fetchUserDetailsError(err));
  }
}

export function* userDetailsData() {
  yield takeLatest(FETCH_USER_DETAILS, getUserDetails);
}

// Bootstrap sagas
export default [
  loginData,
  logoutData,
  userDetailsData,
];
