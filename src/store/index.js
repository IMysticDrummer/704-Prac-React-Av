import { combineReducers, createStore, applyMiddleware } from 'redux';
import * as reducers from './reducers';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import * as auth from '../components/auth/service';
import * as ads from '../components/AdvertsPage/service';

const reducer = combineReducers(reducers);

const failureRedirections =
  (router, redirections) => (store) => (next) => (action) => {
    const result = next(action);
    if (action.error) {
      const redirection = redirections[action.payload.status];
      if (redirection) {
        router.navigate(redirection);
      }
    }

    return result;
  };

export default function configureStore(preloadState, { router }) {
  const middlewares = [
    thunk.withExtraArgument({ api: { auth, ads }, router }),
    failureRedirections(router, {
      401: '/login',
      404: '/404',
    }),
  ];
  const store = createStore(
    reducer,
    preloadState,
    composeWithDevTools(applyMiddleware(...middlewares))
  );
  return store;
}
