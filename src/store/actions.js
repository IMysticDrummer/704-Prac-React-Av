//import { getTags } from '../components/AdvertsPage/service.js';
import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  TAGS_REQUEST,
  TAGS_SUCCESS,
  TAGS_FAILURE,
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
      //const tags = await getTags();
      //dispatch(tagsSuccess(tags));
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
