import { ads, auth, defaultState, tags, ui } from '../reducers';
import {
  ADBYID_ERASE_SUCCESS,
  ADBYID_LOAD_SUCCESS,
  ADS_LOAD_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT_CANCEL,
  AUTH_LOGOUT_REQUEST,
  AUTH_LOGOUT_SUCCESS,
  NEWAD_SUCCESS,
  TAGS_LOAD_SUCCESS,
  UI_RESET_ERROR,
} from '../types';

describe('auth reducer test', () => {
  it("shoud return the default auth state if there's no a controlled action", () => {
    const returnedState = auth(undefined, 'AUTH_NO_DEFINED');
    expect.assertions(1);
    expect(returnedState).toMatchObject(defaultState.auth);
  });
  it('shoud return state=false and askingLogout=false if actions types are AUTH_LOGIN_REQUEST, AUTH_LOGIN_FAILURE or AUTH_LOGOUT_SUCCESS', () => {
    const expectedState = { state: false, askingLogout: false };
    const loginRequestState = auth(defaultState.auth, AUTH_LOGIN_REQUEST);
    const loginFailureState = auth(defaultState.auth, AUTH_LOGIN_FAILURE);
    const logoutSuccessState = auth(defaultState.auth, AUTH_LOGOUT_SUCCESS);
    expect.assertions(3);
    expect(loginRequestState).toMatchObject(expectedState);
    expect(loginFailureState).toMatchObject(expectedState);
    expect(logoutSuccessState).toMatchObject(expectedState);
  });
  it('shoud return state=true and askingLogout=false if actions types are AUTH_LOGIN_SUCCESS or AUTH_LOGOUT_CANCEL', () => {
    const expectedState = { state: true, askingLogout: false };
    const loginSuccessState = auth(defaultState.auth, {
      type: AUTH_LOGIN_SUCCESS,
    });
    const logoutCancelState = auth(defaultState.auth, {
      type: AUTH_LOGOUT_CANCEL,
    });
    expect.assertions(2);
    expect(loginSuccessState).toMatchObject(expectedState);
    expect(logoutCancelState).toMatchObject(expectedState);
  });
  it('shoud return state=true and askingLogout=true if actions types are AUTH_LOGOUT_REQUEST or AUTH_LOGOUT_CANCEL', () => {
    const expectedState = { state: true, askingLogout: true };
    const logoutRequired = auth(defaultState.auth, {
      type: AUTH_LOGOUT_REQUEST,
    });

    expect.assertions(1);
    expect(logoutRequired).toMatchObject(expectedState);
  });
});

describe('tags reducer test', () => {
  it('should return the same state recived if action is different to TAGS_LOAD_SUCCESS', () => {
    const payload = ['one, two'];
    const actionPassed = { type: AUTH_LOGIN_SUCCESS, payload };
    const resultExpected = { areLoaded: false, data: payload };
    const result = tags(resultExpected, actionPassed);
    expect.assertions(1);
    expect(result).toMatchObject(resultExpected);
  });
  it('should return areLoaded=true and data=action.payload if action is TAGS_LOAD_SUCCESS', () => {
    const payload = ['one, two'];
    const actionPassed = { type: TAGS_LOAD_SUCCESS, payload };
    const resultExpected = { areLoaded: true, data: payload };
    const result = tags(undefined, actionPassed);
    expect.assertions(1);
    expect(result).toMatchObject(resultExpected);
  });
});

describe('ads reducer tests', () => {
  it('should return the same state if action.type is not one of the watched actions', () => {
    const data = ['one', 'two'];
    const action = { type: undefined, payload: undefined };
    const preloadState = { data, areLoaded: false };
    const result = ads(preloadState, action);
    expect.assertions(1);
    expect(result).toMatchObject(preloadState);
  });

  it('should return areLoaded=true and data=action.payload if action.type=ADS_LOAD_SUCCESS', () => {
    const payload = ['one, two'];
    const action = { type: ADS_LOAD_SUCCESS, payload };
    const expectedResult = { areLoaded: true, data: payload };
    const result = ads(undefined, action);
    expect.assertions(1);
    expect(result).toMatchObject(expectedResult);
  });

  it('should return areLoaded=state.areLoaded and data=[action.payload] if action.type=ADBYID_LOAD_SUCCESS', () => {
    const payload = 'one';
    const action = { type: ADBYID_LOAD_SUCCESS, payload };
    const preloadStateLoadedFalse = { ...defaultState.ads, areLoaded: false };
    const preloadStateLoadedTrue = { ...defaultState.ads, areLoaded: true };
    const expectedResultLoadedTrue = { areLoaded: true, data: [payload] };
    const expectedResultLoadedFalse = { areLoaded: false, data: [payload] };
    const resultLoadedFalse = ads(preloadStateLoadedFalse, action);
    const resultLoadedTrue = ads(preloadStateLoadedTrue, action);
    expect.assertions(2);
    expect(resultLoadedFalse).toMatchObject(expectedResultLoadedFalse);
    expect(resultLoadedTrue).toMatchObject(expectedResultLoadedTrue);
  });

  it('should return areLoaded=state.areLoaded and data=[action.payload] if action.type=ADBYID_ERASE_SUCCESS', () => {
    const payload = ['one'];
    const action = { type: ADBYID_ERASE_SUCCESS, payload };
    const preloadStateLoadedFalse = { ...defaultState.ads, areLoaded: false };
    const preloadStateLoadedTrue = { ...defaultState.ads, areLoaded: true };
    const expectedResultLoadedTrue = { areLoaded: true, data: payload };
    const expectedResultLoadedFalse = { areLoaded: false, data: payload };
    const resultLoadedFalse = ads(preloadStateLoadedFalse, action);
    const resultLoadedTrue = ads(preloadStateLoadedTrue, action);
    expect.assertions(2);
    expect(resultLoadedFalse).toMatchObject(expectedResultLoadedFalse);
    expect(resultLoadedTrue).toMatchObject(expectedResultLoadedTrue);
  });

  it('should return areLoaded=state.areLoaded and data=[action.payload, ...state.data] if action.type=NEWAD_SUCCESS', () => {
    const payload = 'three';
    const data = ['one', 'two'];
    const action = { type: NEWAD_SUCCESS, payload };
    const preloadStateLoadedFalse = { data, areLoaded: false };
    const preloadStateLoadedTrue = { data, areLoaded: true };
    const expectedResultLoadedTrue = {
      areLoaded: true,
      data: [payload, ...data],
    };
    const expectedResultLoadedFalse = {
      areLoaded: false,
      data: [payload, ...data],
    };
    const resultLoadedFalse = ads(preloadStateLoadedFalse, action);
    const resultLoadedTrue = ads(preloadStateLoadedTrue, action);
    expect.assertions(2);
    expect(resultLoadedFalse).toMatchObject(expectedResultLoadedFalse);
    expect(resultLoadedTrue).toMatchObject(expectedResultLoadedTrue);
  });
});

describe('User Interface reducer tests', () => {
  it("should return error:action.payload, isLoading:false, isErasing:false if there's an error in the action", () => {
    const payload = 'error';
    const action = { type: undefined, error: true, payload };
    const resultExpected = {
      error: payload,
      isLoading: false,
      isErasing: false,
    };

    const result = ui(undefined, action);
    expect.assertions(1);
    expect(result).toMatchObject(resultExpected);
  });

  describe('REQUEST cases: ', () => {
    it("should return the same state if action is not REQUEST, CANCEL, SUCCESS or if it's LOGOUT_REQUEST", () => {
      const preloadState = {
        isLoading: true,
        error: true,
        isErasing: true,
      };
      const resultExpected = preloadState;
      const actionLogout = { type: '_LOGOUT_REQUEST' };
      const actionAny = { type: 'ANY' };

      const resultLogout = ui(preloadState, actionLogout);
      const resultAny = ui(preloadState, actionAny);
      expect.assertions(2);
      expect(resultLogout).toMatchObject(resultExpected);
      expect(resultAny).toMatchObject(resultExpected);
    });

    it('should return isLoading:true, error:null and isErasing:false if action finish with REQUEST not LOGOUT and not ERASE', () => {
      const preloadState = defaultState.ui;
      const resultExpected = {
        ...defaultState.ui,
        isLoading: true,
        error: null,
        isErasing: false,
      };
      const action = { type: '_REQUEST' };

      const result = ui(preloadState, action);
      expect.assertions(1);
      expect(result).toMatchObject(resultExpected);
    });

    it('should return isLoading:false, error:null and isErasing:true if action finish with REQUEST not LOGOUT and not ERASE', () => {
      const preloadState = defaultState.ui;
      const resultExpected = {
        ...defaultState.ui,
        isLoading: false,
        error: null,
        isErasing: true,
      };
      const action = { type: '_ERASE_REQUEST' };

      const result = ui(preloadState, action);
      expect.assertions(1);
      expect(result).toMatchObject(resultExpected);
    });

    it('should return isLoading:false, error:null and isErasing:false if action finish with SUCCESS or CANCEL', () => {
      const preloadState = {
        isLoading: true,
        error: true,
        isErasing: true,
      };
      const resultExpected = {
        ...defaultState.ui,
        isLoading: false,
        error: null,
        isErasing: false,
      };
      const actionSuccess = { type: '_SUCCESS' };
      const actionCancel = { type: '_CANCEL' };

      const resultSuccess = ui(preloadState, actionSuccess);
      const resultCancel = ui(preloadState, actionCancel);
      expect.assertions(2);
      expect(resultSuccess).toMatchObject(resultExpected);
      expect(resultCancel).toMatchObject(resultExpected);
    });

    it('should return the same state and error null if action is UI_RESET_ERROR', () => {
      const preloadState = {
        isLoading: true,
        error: true,
        isErasing: true,
      };
      const resultExpected = {
        ...preloadState,
        error: null,
      };
      const action = { type: UI_RESET_ERROR };

      const result = ui(preloadState, action);
      expect.assertions(1);
      expect(result).toMatchObject(resultExpected);
    });
  });
});
