// @flow
import { C } from '../config/constants';

export const startFetchTimelineData = () => (
  {
    type: C.START_FETCH_TIMELINE_DATA,
  });

export const setTimelineData = (data: Array<Object>) => (
  {
    type: C.SET_TIMELINE_DATA_AFTER_FETCH,
    payload: data,
  });
