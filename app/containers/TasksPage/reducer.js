/*
 *
 * TasksPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  TOGGLE_CREATE_TASK_MODAL,
  CHANGE_CREATE_TASK_FORM,
  CREATE_TASK,
  CREATE_TASK_ERROR,
  CREATE_TASK_SUCCESS,
} from './constants';

const initialState = fromJS({
  showCreateTaskModal: false,
  createTaskResponse: { },
  creatingTask: false,
  createTaskForm: {
    name: '',
    description: '',
  },
});

function tasksPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case TOGGLE_CREATE_TASK_MODAL:
      return state
        .set('createTaskResponse', initialState.get('createTaskResponse'))
        .set('showCreateTaskModal', !state.get('showCreateTaskModal'));
    case CHANGE_CREATE_TASK_FORM:
      return state
        .set('createTaskResponse', initialState.get('createTaskResponse'))
        .setIn(['createTaskForm', action.payload.prop], action.payload.value);
    case CREATE_TASK:
      return state
        .set('createTaskResponse', initialState.get('createTaskResponse'))
        .set('creatingTask', true);
    case CREATE_TASK_ERROR:
      return state
        .set('createTaskResponse', fromJS(action.payload))
        .set('creatingTask', false);
    case CREATE_TASK_SUCCESS:
      return state
        .set('createTaskForm', initialState.get('createTaskForm'))
        .set('showCreateTaskModal', false)
        .set('creatingTask', false);
    default:
      return state;
  }
}

export default tasksPageReducer;
