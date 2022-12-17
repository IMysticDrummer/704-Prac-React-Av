import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
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
