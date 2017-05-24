/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const DEFAULT_LOCALE = 'en';
export const LOGIN = 'app/App/LOGIN';
export const LOGIN_ERROR = 'app/App/LOGIN_ERROR';
export const LOGIN_SUCCESS = 'app/App/LOGIN_SUCCESS';
export const TOGGLE_LOGIN_MODAL = 'app/App/TOGGLE_LOGIN_MODAL';
export const CHANGE_LOGIN_FORM = 'app/App/CHANGE_LOGIN_FORM';
export const LOGOUT = 'app/App/LOGOUT';
export const LOGOUT_ERROR = 'app/App/LOGOUT_ERROR';
export const LOGOUT_SUCCESS = 'app/App/LOGOUT_SUCCESS';
export const FETCH_USER_DETAILS = 'app/App/FETCH_USER_DETAILS';
export const FETCH_USER_DETAILS_ERROR = 'app/App/FETCH_USER_DETAILS_ERROR';
export const FETCH_USER_DETAILS_SUCCESS = 'app/App/FETCH_USER_DETAILS_SUCCESS';
