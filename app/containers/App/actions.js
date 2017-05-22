
import {
  TOGGLE_LOGIN_MODAL,
  CHANGE_LOGIN_FORM,
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGOUT_ERROR,
  LOGOUT_SUCCESS,
} from './constants';

export function toggleLoginModal() {
  return {
    type: TOGGLE_LOGIN_MODAL,
  };
}

export function changeLoginForm(prop, value) {
  return {
    type: CHANGE_LOGIN_FORM,
    payload: { prop, value },
  };
}

export function login() {
  return {
    type: LOGIN,
  };
}

export function loginSuccess(response) {
  return {
    type: LOGIN_SUCCESS,
    payload: response,
  };
}

export function loginError(response) {
  return {
    type: LOGIN_ERROR,
    payload: response,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

export function logoutError() {
  return {
    type: LOGOUT_ERROR,
  };
}
