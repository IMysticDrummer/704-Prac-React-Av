import { combineReducers, createStore, applyMiddleware } from 'redux';
import * as reducers from './reducers';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';

const reducer = combineReducers(reducers);
const middlewares = [thunk];

export default function configureStore(preloadState) {
  const store = createStore(
    reducer,
    preloadState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );
  return store;
}
