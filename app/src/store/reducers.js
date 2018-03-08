// @flow
import { combineReducers } from 'redux';
import { C, defaultTitle, emptyLogin, emptySignup } from '../constants';


export const user = (state: Object = {}, action: Object) => {
  switch (action.type) {
    case C.UPDATE_USER:
      return action.payload;
    case C.LOG_OUT:
      return {};
    default:
      return state;
  }
};

export const loggedIn = (state: boolean = false, action: Object) => {
  switch (action.type) {
    case C.SUCCESS_LOGIN:
      return true;
    case C.LOG_OUT:
      return false;
    default:
      return state;
  }
};

export const isLoginModalOpen = (state: boolean = false, action: Object) => {
  switch (action.type) {
    case C.OPEN_LOGIN_MODAL:
      return true;
    case C.CLOSE_LOGIN_MODAL:
      return false;
    default:
      return state;
  }
};

export const tabvalue = (state: string = 'a', action: Object) => {
  switch (action.type) {
    case C.TAB_CHANGE:
      return state === 'a' ? 'b' : 'a';
    default:
      return state;
  }
};

export const loginLoader = (state: boolean = false, action: Object) => {
  switch (action.type) {
    case C.SUBMIT_LOGIN:
      return true;
    case C.SUCCESS_LOGIN:
      return false;
    case C.FAIL_LOGIN:
      return false;
    case C.CLOSE_LOGIN_MODAL:
      return false;
    default:
      return state;
  }
};

export const signupLoader = (state: boolean = false, action: Object) => {
  switch (action.type) {
    case C.SUBMIT_SIGNUP:
      return true;
    case C.SUCCESS_SIGNUP:
      return false;
    case C.FAIL_SIGNUP:
      return false;
    case C.CLOSE_LOGIN_MODAL:
      return false;
    default:
      return state;
  }
};

export const loginErrors = (state: Object = {}, action: Object) => {
  switch (action.type) {
    case C.FAIL_LOGIN:
      return action.payload;
    case C.CLOSE_LOGIN_MODAL:
      return {};
    case C.SUCCESS_LOGIN:
      return {};
    default:
      return state;
  }
};

export const signupErrors = (state: Object = {}, action: Object) => {
  switch (action.type) {
    case C.FAIL_SIGNUP:
      return action.payload;
    case C.CLOSE_LOGIN_MODAL:
      return {};
    case C.SUCCESS_SIGNUP:
      return {};
    default:
      return state;
  }
};

export const successMessage = (state: string = '', action: Object) => {
  switch (action.type) {
    case C.CLOSE_LOGIN_MODAL:
      return '';
    case C.SUCCESS_SIGNUP:
      return action.payload;
    default:
      return state;
  }
};

export const login = (state: Object = {}, action: Object) => {
  switch (action.type) {
    case C.UPDATE_LOGIN_FIELD:
      return action.payload;
    case C.CLOSE_LOGIN_MODAL:
      return emptyLogin;
    default:
      return state;
  }
};

export const signup = (state: Object = {}, action: Object) => {
  switch (action.type) {
    case C.UPDATE_SIGNUP_FIELD:
      return action.payload;
    case C.CLOSE_LOGIN_MODAL:
      return emptySignup;
    case C.SUCCESS_SIGNUP:
      return emptySignup;
    default:
      return state;
  }
};

export const userOpenNew = (state: boolean = false, action: Object) => {
  switch (action.type) {
    case C.OPEN_USER_MODAL:
      return action.payload.kind === 'new meeting';
    case C.CLOSE_USER_MODAL:
      return false;
    default:
      return state;
  }
};

export const userOpenUpdate = (state: boolean = false, action: Object) => {
  switch (action.type) {
    case C.OPEN_USER_MODAL:
      return action.payload.kind === 'update meeting';
    case C.CLOSE_USER_MODAL:
      return false;
    default:
      return state;
  }
};

export const userBuffer = (state: Object = {}, action: Object) => {
  switch (action.type) {
    case C.OPEN_USER_MODAL: {
      const { kind, event } = action.payload;
      return kind === 'new meeting' ? {
        ...event,
        title: defaultTitle,
      } : event;
    }

    case C.UPDATE_FIELD: {
      const { field, value } = action.payload;
      const newState = Object.assign({}, state);
      newState[field] = value;
      return newState;
    }

    case C.CLOSE_USER_MODAL:
      return {};

    default:
      return state;
  }
};

export const userEvents = (state: Array<Object> = [], action: Object) => {
  switch (action.type) {
    case C.SUBMIT_MEETING:
      return action.payload;
    case C.REMOVE_EVENT:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  user,
  loggedIn,
  tabvalue,
  loginLoader,
  loginErrors,
  successMessage,
  login,
  signupLoader,
  signupErrors,
  signup,
  isLoginModalOpen,
  userOpenNew,
  userOpenUpdate,
  userBuffer,
  userEvents,
});
