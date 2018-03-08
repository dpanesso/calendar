/**
 * Logger
 */
export const activateLogger = true;

/**
 * Redux Store
 */
export const C = {
  OPEN_USER_MODAL: 'OPEN_USER_MODAL',
  CLOSE_USER_MODAL: 'CLOSE_USER_MODAL',
  UPDATE_FIELD: 'UPDATE_FIELD',
  UPDATE_MEETINGS: 'UPDATE_MEETINGS',
  NOTIFY_DB_ERROR: 'NOTIFY_DB_ERROR',
  OPEN_LOGIN_MODAL: 'OPEN_LOGIN_MODAL',
  CLOSE_LOGIN_MODAL: 'CLOSE_LOGIN_MODAL',
  TAB_CHANGE: 'TAB_CHANGE',
  UPDATE_LOGIN_FIELD: 'UPDATE_LOGIN_FIELD',
  REMOVE_EVENT: 'REMOVE_EVENT',
  SUBMIT_LOGIN: 'SUBMIT_LOGIN',
  SUCCESS_LOGIN: 'SUCCESS_LOGIN',
  FAIL_LOGIN: 'FAIL_LOGIN',
  UPDATE_SIGNUP_FIELD: 'UPDATE_SIGNUP_FIELD',
  SUBMIT_SIGNUP: 'SUBMIT_SIGNUP',
  SUCCESS_SIGNUP: 'SUCCESS_SIGNUP',
  FAIL_SIGNUP: 'FAIL_SIGNUP',
  UPDATE_USER: 'UPDATE_USER',
<<<<<<< HEAD
  LOG_OUT: 'LOG_OUT',
=======
  TOGGLE_DAPP: 'TOGGLE_DAPP',
<<<<<<< HEAD
>>>>>>> add state to open a dapp at submit new meeting event
=======
  ONBOARDING_DONE: 'ONBOARDING_DONE',
>>>>>>> add onboarding for dapp
};

/**
 * Reducer default values
 */
export const defaultTitle = 'Bunga-Bunga';

export const emptyLogin = {
  email: '',
  password: '',
};

export const emptySignup = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};
