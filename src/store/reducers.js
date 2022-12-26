import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  TAGS_LOAD_SUCCESS,
  UI_RESET_ERROR,
  AUTH_LOGOUT_SUCCESS,
  ADS_LOAD_SUCCESS,
  AUTH_LOGOUT_REQUEST,
  AUTH_LOGOUT_CANCEL,
  ADBYID_LOAD_SUCCESS,
  ADBYID_ERASE_SUCCESS,
  NEWAD_SUCCESS,
} from './types.js';

export const defaultState = {
  auth: {
    state: false,
    askingLogout: false,
  },
  tags: {
    areLoaded: false,
    data: [],
  },
  ads: {
    areLoaded: false,
    data: [],
  },
  ui: {
    isLoading: false,
    error: null,
    isErasing: false,
  },
};

export function auth(state = defaultState.auth, action) {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
      return { state: false, askingLogout: false };
    case AUTH_LOGIN_SUCCESS:
      return { state: true, askingLogout: false };
    case AUTH_LOGIN_FAILURE:
      return { state: false, askingLogout: false };
    case AUTH_LOGOUT_REQUEST:
      return { state: true, askingLogout: true };
    case AUTH_LOGOUT_SUCCESS:
      return { state: false, askingLogout: false };
    case AUTH_LOGOUT_CANCEL:
      return { state: true, askingLogout: false };
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

export function ads(state = defaultState.ads, action) {
  switch (action.type) {
    case ADS_LOAD_SUCCESS:
      return { areLoaded: true, data: action.payload };
    case ADBYID_LOAD_SUCCESS:
      return { areLoaded: state.areLoaded, data: [action.payload] };
    case ADBYID_ERASE_SUCCESS:
      return { areLoaded: state.areLoaded, data: action.payload };
    case NEWAD_SUCCESS:
      return {
        areLoaded: state.areLoaded,
        data: [action.payload, ...state.data],
      };
    default:
      return state;
  }
}

export function ui(state = defaultState.ui, action) {
  // Any case in error. For example AUTH_LOGIN_FAILURE
  if (action.error) {
    return { error: action.payload, isLoading: false, isErasing: false };
  }

  if (/_REQUEST$/.test(action.type) && !/_LOGOUT_/.test(action.type)) {
    if (/_ERASE_/.test(action.type))
      return { ...state, isLoading: false, error: null, isErasing: true };
    return { ...state, isLoading: true, error: null, isErasing: false };
  }
  //Toda acción que acabe en SUCCESS con expresiones regulares
  if (/_SUCCESS$/.test(action.type)) {
    return { ...state, isLoading: false, error: null, isErasing: false };
  }
  if (/_CANCEL$/.test(action.type)) {
    return {
      ...state,
      isLoading: false,
      error: null,
      isErasing: false,
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
