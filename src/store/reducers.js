import { handleLogout } from '../components/auth/service.js';
import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT,
  TAGS_LOADED,
} from './types.js';

const defaultState = {
  auth: false,
  tags: [],
};

export function auth(state = defaultState.auth, action) {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
      return false;
    case AUTH_LOGIN_SUCCESS:
      return true;
    case AUTH_LOGIN_FAILURE:
      return false;
    case AUTH_LOGOUT:
      handleLogout();
      return false;
    default:
      return state;
  }
}

export function tags(state = defaultState.tags, action) {
  switch (action.type) {
    case TAGS_LOADED:
      return action.payload;

    default:
      return state;
  }
}
