import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { REGISTER } from './constants';
import { registerSuccess, registerError } from './actions';

import request from '../../utils/request';
import makeSelectRegister from './selectors';

export function* getRegister() {
  const { registerForm } = yield select(makeSelectRegister());
  const requestURL = '/api/register';

  if (registerForm.password !== registerForm.confirmPassword) {
    return yield put(registerError({
      success: false,
      message: 'Confirm Password and Password doesn\'t match',
    }));
  }

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerForm),
      credentials: 'same-origin',
    });
    return yield put(registerSuccess(response));
  } catch (err) {
    return yield put(registerError(err));
  }
}
export function* registerData() {
  const watcher = yield takeLatest(REGISTER, getRegister);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  registerData,
];
