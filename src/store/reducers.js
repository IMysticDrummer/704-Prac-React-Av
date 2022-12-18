import { handleLogout } from '../components/auth/service.js';
import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT,
  TAGS_REQUEST,
  TAGS_SUCCESS,
  TAGS_FAILURE,
  UI_RESET_ERROR,
} from './types.js';

const defaultState = {
  auth: false,
  tags: [],
  ui: {
    isLoading: false,
    error: null,
  },
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
    case TAGS_SUCCESS:
      return action.payload;

    default:
      return state;
  }
}

export function ui(state = defaultState.ui, action) {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
      return { error: null, isLoading: true };
    case AUTH_LOGIN_SUCCESS:
      return { error: null, isLoading: false };
    case AUTH_LOGIN_FAILURE:
      return { error: action.payload, isLoading: false };
    case UI_RESET_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
}
