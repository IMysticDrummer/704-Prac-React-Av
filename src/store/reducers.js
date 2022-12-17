import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
} from './types.js';

const defaultState = {
  isLogged: false,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
      return { ...state, isLogged: false };
    case AUTH_LOGIN_SUCCESS:
      return { ...state, isLogged: true };
    case AUTH_LOGIN_FAILURE:
      return { ...state, isLogged: false };

    default:
      return state;
  }
}
