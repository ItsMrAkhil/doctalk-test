/*
 *
 * Register reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  CHANGE_REGISTER_FORM,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
} from './constants';

const initialState = fromJS({
  registerForm: { },
  response: { },
});

function registerReducer(state = initialState, { type, payload }) {
  switch (type) {
    case DEFAULT_ACTION:
      return state;
    case CHANGE_REGISTER_FORM:
      return state
        .set('response', fromJS({}))
        .setIn(['registerForm', payload.prop], payload.value);
    case REGISTER:
      return state
        .set('response', fromJS({}))
        .set('registering', true);
    case REGISTER_ERROR:
      return state
        .set('response', fromJS(payload))
        .set('registering', false);
    case REGISTER_SUCCESS:
      return state
        .set('registerForm', initialState.get('registerForm'))
        .set('response', fromJS(payload))
        .set('registering', false);
    default:
      return state;
  }
}

export default registerReducer;
