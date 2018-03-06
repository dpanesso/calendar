// @flow
import { combineReducers } from 'redux';
import { C, defaultTitle } from '../constants';

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

    default:
      return state;
  }
};

export default combineReducers({
  userOpenNew,
  userOpenUpdate,
  userBuffer,
  userEvents,
});
