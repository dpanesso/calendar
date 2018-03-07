// @flow
import { C } from '../constants';


export const updateUserData = (user: Object) => (
  {
    type: C.UPDATE_USER,
    payload: user,
  });

export const openLoginModal = () => (
  {
    type: C.OPEN_LOGIN_MODAL,
  });

export const closeLoginModal = () => (
  {
    type: C.CLOSE_LOGIN_MODAL,
  });

export const changeLoginTab = () => (
  {
    type: C.TAB_CHANGE,
  });

export const updateUserLoginField = (login: Object) => (
  {
    type: C.UPDATE_LOGIN_FIELD,
    payload: login,
  });

export const submitUserLogin = () => (
  {
    type: C.SUBMIT_LOGIN,
  });

export const successUserLogin = () => (
  {
    type: C.SUCCESS_LOGIN,
  });

export const failUserLogin = (errors: Object) => (
  {
    type: C.FAIL_LOGIN,
    payload: errors,
  });

export const updateUserSignupField = (signup: Object) => (
  {
    type: C.UPDATE_SIGNUP_FIELD,
    payload: signup,
  });

export const submitUserSignup = () => (
  {
    type: C.SUBMIT_SIGNUP,
  });

export const successUserSignup = () => (
  {
    type: C.SUCCESS_SIGNUP,
  });

export const failUserSignup = (errors: Object) => (
  {
    type: C.FAIL_SIGNUP,
    payload: errors,
  });

export const openUserModal = (kind: boolean, event: Object) => (
  {
    type: C.OPEN_USER_MODAL,
    payload: {
      kind,
      event,
    },
  });

export const closeUserModal = () => (
  {
    type: C.CLOSE_USER_MODAL,
  });

export const updateUserField = (field: string, value: string) => (
  {
    type: C.UPDATE_FIELD,
    payload: {
      field,
      value,
    },
  });

export const submitUserEvent = (event: Object) => (
  {
    type: C.SUBMIT_MEETING,
    payload: event,
  });

  export const toggleDapp = () => (
    {
      type: C.TOGGLE_DAPP,
    });
