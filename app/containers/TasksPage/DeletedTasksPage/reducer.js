/*
 *
 * DeletedTasksPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  FETCH_TASKS_LIST,
  FETCH_TASKS_LIST_ERROR,
  FETCH_TASKS_LIST_SUCCESS,
} from './constants';

const initialState = fromJS({
  tasks: [],
});

function deletedTasksPageReducer(state = initialState, { type, payload }) {
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
    default:
      return state;
  }
}

export default deletedTasksPageReducer;
