//import { getTags } from '../components/AdvertsPage/service.js';
import { areTagsLoaded } from './selectors.js';
import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  TAGS_LOAD_REQUEST,
  TAGS_LOAD_SUCCESS,
  TAGS_LOAD_FAILURE,
  UI_RESET_ERROR,
  AUTH_LOGOUT_REQUEST,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_CANCEL,
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
  return async function (dispatch, getState, { api, router }) {
    try {
      dispatch(authLoginRequest());
      await api.auth.login({ email, password }, remember);
      dispatch(authLoginSuccess());
      const to = router.state.location.state?.from?.pathname || '/';
      router.navigate(to, { replace: true });
    } catch (error) {
      dispatch(authLoginFailure(error));
    }
  };
};

export function authLogoutRequest() {
  return {
    type: AUTH_LOGOUT_REQUEST,
  };
}
export function authLogoutSuccess() {
  return {
    type: AUTH_LOGOUT_SUCCESS,
  };
}
export function authLogoutCancel() {
  return {
    type: AUTH_LOGOUT_CANCEL,
  };
}

export function authLogout(response) {
  return async function (dispatch, getState, { api, router }) {
    if (response) {
      try {
        await api.auth.handleLogout();
        dispatch(authLogoutSuccess());
        const to = router.state.location.state?.from?.pathname || '/';
        router.navigate(to, { replace: true });
      } catch (error) {
        //TODO tratar el error
      }
    } else {
      dispatch(authLogoutCancel());
    }
  };
}

export function tagsLoadRequest() {
  return {
    type: TAGS_LOAD_REQUEST,
  };
}

export function tagsLoadSuccess(tags) {
  return {
    type: TAGS_LOAD_SUCCESS,
    payload: tags,
  };
}
export function tagsLoadFailure(error) {
  return {
    type: TAGS_LOAD_FAILURE,
    payload: error,
    error: true,
  };
}

export function getTagsAction() {
  return async function (dispatch, getState, { api }) {
    const areLoaded = areTagsLoaded(getState());
    if (areLoaded) return;
    try {
      dispatch(tagsLoadRequest());
      const tags = await api.ads.getTags();
      dispatch(tagsLoadSuccess(tags));
    } catch (error) {
      dispatch(tagsLoadFailure());
      throw error;
    }
  };
}

export function uiResetError() {
  return {
    type: UI_RESET_ERROR,
  };
}
