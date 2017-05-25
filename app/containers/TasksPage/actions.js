/*
 *
 * TasksPage actions
 *
 */

import {
  DEFAULT_ACTION,
  TOGGLE_CREATE_TASK_MODAL,
  CREATE_TASK,
  CREATE_TASK_ERROR,
  CREATE_TASK_SUCCESS,
  CHANGE_CREATE_TASK_FORM,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function toggleCreateTaskModal() {
  return {
    type: TOGGLE_CREATE_TASK_MODAL,
  };
}

export function changeCreateTaskForm(prop, value) {
  return {
    type: CHANGE_CREATE_TASK_FORM,
    payload: { prop, value },
  };
}

export function createTask() {
  return {
    type: CREATE_TASK,
  };
}

export function createTaskError(response) {
  return {
    type: CREATE_TASK_ERROR,
    payload: response,
  };
}

export function createTaskSuccess(response) {
  return {
    type: CREATE_TASK_SUCCESS,
    payload: response,
  };
}
