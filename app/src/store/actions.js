// @flow
import { C } from '../constants';

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
