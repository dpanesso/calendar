// @flow
import { combineReducers } from 'redux';
import { C } from '../constants';

export const userMeetingCalendar = (state: Object = {}, action: Object) => {
  switch (action.type) {

    case C.START_UPDATE:
      const type = action.payload.type;
      
      return {
        ...state,
        buffer:
      };

      case C.ON_KEY_UPDATE:
      return {
        ...state,
        buffer: {

        }
      };

    case C.ON_SUBMIT:
      return {
        timelineLoading: false,
        timelineData: action.payload,
      };

    default:
      return state;
  }
};

export default combineReducers({
  userMeetingCalendar,
});
