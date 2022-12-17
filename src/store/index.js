import { combineReducers, createStore } from 'redux';
import * as reducers from './reducers';

const reducer = combineReducers(reducers);

export default function configureStore(preloadState) {
  const store = createStore(reducer, preloadState);
  return store;
}
