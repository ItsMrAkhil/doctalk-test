import { take, call, put, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { FETCH_TASKS_LIST } from './constants';
import { fetchTasksListError, fetchTasksListSuccess } from './actions';

import request from '../../../utils/request';

export function* getTasksList() {
  const requestURL = '/api/tasks?deleted=true';

  try {
    const response = yield call(request, requestURL, {
      credentials: 'same-origin',
    });
    return yield put(fetchTasksListSuccess(response));
  } catch (err) {
    return yield put(fetchTasksListError(err));
  }
}
export function* tasksListData() {
  const watcher = yield takeLatest(FETCH_TASKS_LIST, getTasksList);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  tasksListData,
];
