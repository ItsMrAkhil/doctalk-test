/*
 *
 * Register actions
 *
 */

import {
  DEFAULT_ACTION,
  CHANGE_REGISTER_FORM,
  REGISTER,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function changeRegisterForm(prop, value) {
  return {
    type: CHANGE_REGISTER_FORM,
    payload: { prop, value },
  };
}

export function register() {
  return {
    type: REGISTER,
  };
}

export function registerSuccess(response) {
  return {
    type: REGISTER_SUCCESS,
    payload: response,
  };
}

export function registerError(response) {
  return {
    type: REGISTER_ERROR,
    payload: response,
  };
}
