import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  TAGS_LOAD_SUCCESS,
  UI_RESET_ERROR,
  AUTH_LOGOUT_SUCCESS,
} from './types.js';

export const defaultState = {
  auth: false,
  tags: {
    areLoaded: false,
    data: [],
  },
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
    case AUTH_LOGOUT_SUCCESS:
      return false;
    default:
      return state;
  }
}

export function tags(state = defaultState.tags, action) {
  switch (action.type) {
    case TAGS_LOAD_SUCCESS:
      return { areLoaded: true, data: action.payload };
    default:
      return state;
  }
}

export function ui(state = defaultState.ui, action) {
  // Any case in error. For example AUTH_LOGIN_FAILURE
  if (action.error) {
    return { error: action.payload, isLoading: false };
  }

  if (/_REQUEST$/.test(action.type)) {
    return {
      error: null,
      isLoading: true,
    };
  }
  //Toda acción que acabe en SUCCESS con expresiones regulares
  if (/_SUCCESS$/.test(action.type)) {
    return {
      error: null,
      isLoading: false,
    };
  }
  if (/_CANCEL$/.test(action.type)) {
    return {
      ...state,
      isLoading: false,
      error: null,
    };
  }

  if (action.type === UI_RESET_ERROR) {
    return {
      ...state,
      error: null,
    };
  }

  return state;
}
