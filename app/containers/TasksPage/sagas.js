import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { CREATE_TASK } from './constants';
import { createTaskSuccess, createTaskError } from './actions';

import request from '../../utils/request';
import makeSelectTasksPage from './selectors';

export function* getCreateTask() {
  const { createTaskForm } = yield select(makeSelectTasksPage());
  const requestURL = '/api/tasks';

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createTaskForm),
      credentials: 'same-origin',
    });
    return yield put(createTaskSuccess(response));
  } catch (err) {
    return yield put(createTaskError(err));
  }
}
export function* createTaskData() {
  const watcher = yield takeLatest(CREATE_TASK, getCreateTask);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  createTaskData,
];
