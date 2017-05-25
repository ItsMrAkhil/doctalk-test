/*
 *
 * ListTasksPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  FETCH_TASKS_LIST,
  FETCH_TASKS_LIST_ERROR,
  FETCH_TASKS_LIST_SUCCESS,
  TOGGLE_DELETE_TASK_MODAL,
  TOGGLE_EDIT_TASK_MODAL,
  CHANGE_EDIT_TASK_FORM,
  EDIT_TASK,
  DELETE_TASK,
  DELETE_TASK_ERROR,
  DELETE_TASK_SUCCESS,
  EDIT_TASK_ERROR,
  EDIT_TASK_SUCCESS,
  CHANGE_FILTER_FORM,
  RESET_FILTER,
} from './constants';

const initialState = fromJS({
  fetchingTasks: false,
  tasks: [],
  deleteModalTaskId: '',
  editModalTaskId: '',
  editTaskForm: { },
  editingTask: false,
  response: { },
  filterForm: { },
});

function listTasksPageReducer(state = initialState, { type, payload }) {
  switch (type) {
    case DEFAULT_ACTION:
      return state;
    case FETCH_TASKS_LIST:
      return state
        .set('fetchingTasks', true);
    case FETCH_TASKS_LIST_ERROR:
      return state
        .set('fetchingTasks', false);
    case FETCH_TASKS_LIST_SUCCESS:
      return state
        .set('tasks', fromJS(payload.tasks))
        .set('fetchingTasks', false);
    case TOGGLE_DELETE_TASK_MODAL:
      return state
        .set('response', initialState.get('response'))
        .set('deleteModalTaskId', payload);
    case DELETE_TASK:
      return state
        .set('response', initialState.get('response'))
        .set('deletingTask', true);
    case DELETE_TASK_ERROR:
      return state
        .set('response', fromJS(payload))
        .set('deletingTask', false);
    case DELETE_TASK_SUCCESS:
      return state
        .set('deleteModalTaskId', '')
        .set('deletingTask', false);
    case TOGGLE_EDIT_TASK_MODAL:
      return state
        .set('editTaskForm', initialState.get('editTaskForm'))
        .set('editModalTaskId', payload);
    case CHANGE_EDIT_TASK_FORM:
      return state
        .set('response', initialState.get('response'))
        .setIn(['editTaskForm', payload.prop], payload.value);
    case EDIT_TASK:
      return state
        .set('response', initialState.get('response'))
        .set('editingTask', true);
    case EDIT_TASK_ERROR:
      return state
        .set('response', fromJS(payload))
        .set('editingTask', false);
    case EDIT_TASK_SUCCESS:
      return state
        .set('response', fromJS(payload))
        .set('editingTask', false);
    case CHANGE_FILTER_FORM:
      return state
        .set('fetchingTasks', true)
        .setIn(['filterForm', payload.prop], payload.value);
    case RESET_FILTER:
      return state
        .set('filterForm', initialState.get('filterForm'))
        .set('fetchingTasks', true);
    default:
      return state;
  }
}

export default listTasksPageReducer;
