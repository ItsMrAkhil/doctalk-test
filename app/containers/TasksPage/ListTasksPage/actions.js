/*
 *
 * ListTasksPage actions
 *
 */

import {
  DEFAULT_ACTION,
  FETCH_TASKS_LIST,
  FETCH_TASKS_LIST_ERROR,
  FETCH_TASKS_LIST_SUCCESS,
  TOGGLE_DELETE_TASK_MODAL,
  DELETE_TASK,
  DELETE_TASK_ERROR,
  DELETE_TASK_SUCCESS,
  TOGGLE_EDIT_TASK_MODAL,
  CHANGE_EDIT_TASK_FORM,
  EDIT_TASK,
  EDIT_TASK_ERROR,
  EDIT_TASK_SUCCESS,
  CHANGE_FILTER_FORM,
  RESET_FILTER,
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

export function toggleDeleteTaskModal(taskId) {
  return {
    type: TOGGLE_DELETE_TASK_MODAL,
    payload: taskId,
  };
}

export function deleteTask() {
  return {
    type: DELETE_TASK,
  };
}

export function deleteTaskError(response) {
  return {
    type: DELETE_TASK_ERROR,
    payload: response,
  };
}

export function deleteTaskSuccess(response) {
  return {
    type: DELETE_TASK_SUCCESS,
    payload: response,
  };
}

export function toggleEditTaskModal(taskId) {
  return {
    type: TOGGLE_EDIT_TASK_MODAL,
    payload: taskId,
  };
}

export function changeEditTaskForm(prop, value) {
  return {
    type: CHANGE_EDIT_TASK_FORM,
    payload: { prop, value },
  };
}

export function editTask() {
  return {
    type: EDIT_TASK,
  };
}

export function editTaskSuccess(response) {
  return {
    type: EDIT_TASK_SUCCESS,
    payload: response,
  };
}

export function editTaskError(response) {
  return {
    type: EDIT_TASK_ERROR,
    payload: response,
  };
}

export function changeFilterForm(prop, value) {
  return {
    type: CHANGE_FILTER_FORM,
    payload: { prop, value },
  };
}

export function resetFilter() {
  return {
    type: RESET_FILTER,
  };
}
