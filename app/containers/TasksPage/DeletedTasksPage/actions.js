/*
 *
 * DeletedTasksPage actions
 *
 */

import {
  DEFAULT_ACTION,
  FETCH_TASKS_LIST,
  FETCH_TASKS_LIST_ERROR,
  FETCH_TASKS_LIST_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function fetchTasksList() {
  return {
    type: FETCH_TASKS_LIST,
  };
}

export function fetchTasksListError(response) {
  return {
    type: FETCH_TASKS_LIST_ERROR,
    payload: response,
  };
}


export function fetchTasksListSuccess(response) {
  return {
    type: FETCH_TASKS_LIST_SUCCESS,
    payload: response,
  };
}
