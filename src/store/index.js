import { combineReducers, createStore } from 'redux';
import * as reducers from './reducers';
import { composeWithDevTools } from '@redux-devtools/extension';

const reducer = combineReducers(reducers);

export default function configureStore(preloadState) {
  const store = createStore(reducer, preloadState, composeWithDevTools());
  return store;
}
