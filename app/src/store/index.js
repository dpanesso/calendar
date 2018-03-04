// @flow
import { createStore, applyMiddleware } from 'redux';
import appReducer from './reducers';
import { activateLogger } from '../config/constants';

const logger = store => next => (action) => {
  let result;
  if (activateLogger) {
    console.groupCollapsed('dispatching action => ', action.type);
    console.log('prev states', store.getState());
    console.log('action', action);
    result = next(action);
    console.log('next state', store.getState());
    console.groupEnd();
  } else {
    result = next(action);
  }
  return result;
};

const saver = store => next => (action) => {
  const result = next(action);
  localStorage['redux-store'] = JSON.stringify(store.getState());
  return result;
};

export default (initialState: JSON) =>
  applyMiddleware(logger, saver)(createStore)(
    appReducer,
    (
      localStorage['redux-store']) ?
      JSON.parse(localStorage['redux-store']) :
      initialState,
  );
