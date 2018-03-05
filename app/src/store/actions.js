// @flow
import { C } from '../constants';

export const startUpdateCalendar = () => (
  {
    type: C.START_UPDATE,
  });

export const fieldUpdateCalendar = (data: Array<Object>) => (
  {
    type: C.SET_TIMELINE_DATA_AFTER_FETCH,
    payload: data,
  });
