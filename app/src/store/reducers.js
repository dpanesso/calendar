// @flow
import { combineReducers } from 'redux';
import { C } from '../constants';

export const userMeetingCalendar = (state: Object = {}, action: Object) => {
  switch (action.type) {

    case C.START_MEETING_UPDATE:
      const type = action.payload.type;

      return state

      case C.FIELD_UPDATE:
      return state

    case C.ON_SUBMIT:
      return state

    default:
      return state;
  }
};

export default combineReducers({
  userMeetingCalendar,
});
