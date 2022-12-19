import { getTags } from '../components/AdvertsPage/service.js';
import { login } from '../components/auth/service.js';
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

export function authLoginFailure(error) {
  return {
    type: AUTH_LOGIN_FAILURE,
    payload: error,
    error: true,
  };
}

export const authLogin = (credentials) => {
  const { email, password, remember } = credentials;
  return async function (dispatch, getState) {
    try {
      dispatch(authLoginRequest());
      await login({ email, password }, remember);
      dispatch(authLoginSuccess());
    } catch (error) {
      dispatch(authLoginFailure(error));
      throw error;
    }
  };
};

export function authLogout() {
  return {
    type: AUTH_LOGOUT,
  };
}

export function tagsRequest() {
  return {
    type: TAGS_REQUEST,
  };
}

export function tagsSuccess(tags) {
  return {
    type: TAGS_SUCCESS,
    payload: tags,
  };
}
export function tagsFailure(error) {
  return {
    type: TAGS_FAILURE,
    payload: error,
    error: true,
  };
}

export function getTagsAction() {
  return async function (dispatch, getState) {
    try {
      dispatch(tagsRequest());
      const tags = await getTags();
      dispatch(tagsSuccess(tags));
    } catch (error) {
      dispatch(tagsFailure());
      throw error;
    }
  };
}

export function uiResetError() {
  return {
    type: UI_RESET_ERROR,
  };
}
