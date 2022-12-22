import { combineReducers, createStore, applyMiddleware } from 'redux';
import * as reducers from './reducers';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import * as auth from '../components/auth/service';

const reducer = combineReducers(reducers);
const middlewares = [thunk.withExtraArgument({ api: { auth } })];

export default function configureStore(preloadState) {
  const store = createStore(
    reducer,
    preloadState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );
  return store;
}
