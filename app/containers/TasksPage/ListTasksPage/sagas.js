import { take, call, put, cancel, select, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { CREATE_TASK_SUCCESS } from '../constants';
import {
  FETCH_TASKS_LIST, DELETE_TASK_SUCCESS,
  DELETE_TASK, EDIT_TASK, EDIT_TASK_SUCCESS,
  CHANGE_FILTER_FORM, RESET_FILTER,
} from './constants';
import { fetchTasksListError, fetchTasksListSuccess,
  deleteTaskError, deleteTaskSuccess, editTaskError, editTaskSuccess,
} from './actions';
import makeSelectListTasksPage from './selectors';

import request from '../../../utils/request';

export function* getTasksList() {
  const { filterForm: { fromDate, toDate } } = yield select(makeSelectListTasksPage());
  const filterParams = new URLSearchParams();
  if (fromDate) {
    filterParams.append('fromDate', fromDate);
  } if (toDate) {
    filterParams.append('toDate', toDate);
  }
  const requestURL = `/api/tasks?${filterParams.toString()}`;

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
  const updateOnAddWatcher = yield takeLatest(CREATE_TASK_SUCCESS, getTasksList);
  const updateOnDeleteWatcher = yield takeLatest(DELETE_TASK_SUCCESS, getTasksList);
  const updateOnEditWatcher = yield takeLatest(EDIT_TASK_SUCCESS, getTasksList);
  const updateOnFilterChangeWatcher = yield takeLatest(CHANGE_FILTER_FORM, getTasksList);
  const updateOnFilterResetWatcher = yield takeLatest(RESET_FILTER, getTasksList);

  // Cancel all watchers on location change
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
  yield cancel(updateOnAddWatcher);
  yield cancel(updateOnDeleteWatcher);
  yield cancel(updateOnEditWatcher);
  yield cancel(updateOnFilterChangeWatcher);
  yield cancel(updateOnFilterResetWatcher);
}

export function* getTaskDelete() {
  const { deleteModalTaskId } = yield select(makeSelectListTasksPage());
  const requestURL = `/api/tasks/${deleteModalTaskId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'DELETE',
      credentials: 'same-origin',
    });
    return yield put(deleteTaskSuccess(response));
  } catch (err) {
    return yield put(deleteTaskError(err));
  }
}

export function* deleteTaskData() {
  const watcher = yield takeLatest(DELETE_TASK, getTaskDelete);
  // Cancel watcher on location change
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* getTaskEdit() {
  const { editModalTaskId, editTaskForm } = yield select(makeSelectListTasksPage());
  const requestURL = `/api/tasks/${editModalTaskId}`;

  try {
    const response = yield call(request, requestURL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editTaskForm),
      credentials: 'same-origin',
    });
    return yield put(editTaskSuccess(response));
  } catch (err) {
    return yield put(editTaskError(err));
  }
}

export function* editTaskData() {
  const watcher = yield takeLatest(EDIT_TASK, getTaskEdit);
  // Cancel watcher on location change
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  tasksListData,
  deleteTaskData,
  editTaskData,
];
