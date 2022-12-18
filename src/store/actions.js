import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT,
  TAGS_LOADED,
} from './types.js';

export function authLoginRequest() {
  return {
    type: AUTH_LOGIN_REQUEST,
  };
}

export function authLoginSuccess() {
  return {
    type: AUTH_LOGIN_SUCCESS,
  };
}

export function authLoginFailure() {
  return {
    type: AUTH_LOGIN_FAILURE,
  };
}

export function authLogout() {
  return {
    type: AUTH_LOGOUT,
  };
}

export function tagsLoaded(tags) {
  return {
    type: TAGS_LOADED,
    payload: tags,
  };
}
