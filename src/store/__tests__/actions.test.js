import * as actions from '../actions';
import {
  ADBYID_ERASE_CANCEL,
  ADBYID_ERASE_FAILURE,
  ADBYID_ERASE_REQUEST,
  ADBYID_ERASE_SUCCESS,
  ADBYID_LOAD_FAILURE,
  ADBYID_LOAD_REQUEST,
  ADBYID_LOAD_SUCCESS,
  ADS_LOAD_FAILURE,
  ADS_LOAD_REQUEST,
  ADS_LOAD_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT_CANCEL,
  AUTH_LOGOUT_REQUEST,
  AUTH_LOGOUT_SUCCESS,
  NEWAD_FAILURE,
  NEWAD_REQUEST,
  NEWAD_SUCCESS,
  TAGS_LOAD_FAILURE,
  TAGS_LOAD_REQUEST,
  TAGS_LOAD_SUCCESS,
  UI_RESET_ERROR,
} from '../types';
import * as selectors from '../selectors';

jest.mock('../selectors');

describe('Synchronic actions test', () => {
  const error = 'error';
  const data = 'data';
  const errorObject = (type) => {
    return {
      type,
      error: true,
      payload: error,
    };
  };
  const successObject = (type) => {
    return {
      type,
      payload: data,
    };
  };
  test('authLoginRequest must return type AUTH_LOGIN_REQUEST', () => {
    const result = actions.authLoginRequest();
    expect(result.type).toBe(AUTH_LOGIN_REQUEST);
  });
  test('authLoginSuccess must return type AUTH_LOGIN_SUCCESS', () => {
    const result = actions.authLoginSuccess();
    expect(result.type).toBe(AUTH_LOGIN_SUCCESS);
  });
  test('authLoginFailure must return type AUTH_LOGIN_FAILURE', () => {
    const result = actions.authLoginFailure(error);
    expect(result).toMatchObject(errorObject(AUTH_LOGIN_FAILURE));
  });
  test('authLogoutRequest must return type AUTH_LOGOUT_REQUEST', () => {
    const result = actions.authLogoutRequest();
    expect(result.type).toBe(AUTH_LOGOUT_REQUEST);
  });
  test('authLogoutSuccess must return type AUTH_LOGOUT_SUCCESS', () => {
    const result = actions.authLogoutSuccess();
    expect(result.type).toBe(AUTH_LOGOUT_SUCCESS);
  });
  test('authLogoutCancel must return type AUTH_LOGOUT_CANCEL', () => {
    const result = actions.authLogoutCancel();
    expect(result.type).toBe(AUTH_LOGOUT_CANCEL);
  });
  test('tagsLoadRequest must return type TAGS_LOAD_REQUEST', () => {
    const result = actions.tagsLoadRequest();
    expect(result.type).toBe(TAGS_LOAD_REQUEST);
  });
  test('tagsLoadSuccess must return type TAGS_LOAD_SUCCESS', () => {
    const result = actions.tagsLoadSuccess(data);
    expect(result).toMatchObject(successObject(TAGS_LOAD_SUCCESS));
  });
  test('tagsLoadFailure must return type TAGS_LOAD_FAILURE', () => {
    const result = actions.tagsLoadFailure(error);
    expect(result).toMatchObject(errorObject(TAGS_LOAD_FAILURE));
  });
  test('adsLoadRequest must return type ADS_LOAD_REQUEST', () => {
    const result = actions.adsLoadRequest();
    expect(result.type).toBe(ADS_LOAD_REQUEST);
  });
  test('adsLoadSuccess must return type ADS_LOAD_SUCCESS', () => {
    const result = actions.adsLoadSuccess(data);
    expect(result).toMatchObject(successObject(ADS_LOAD_SUCCESS));
  });
  test('adsLoadFailure must return type ADS_LOAD_FAILURE', () => {
    const result = actions.adsLoadFailure(error);
    expect(result).toMatchObject(errorObject(ADS_LOAD_FAILURE));
  });
  test('adByIdLoadRequest must return type ADBYID_LOAD_REQUEST', () => {
    const result = actions.adByIdLoadRequest();
    expect(result.type).toBe(ADBYID_LOAD_REQUEST);
  });
  test('adByIdLoadSuccess must return type ADBYID_LOAD_SUCCESS', () => {
    const result = actions.adByIdLoadSuccess(data);
    expect(result).toMatchObject(successObject(ADBYID_LOAD_SUCCESS));
  });
  test('adByIdLoadFailure must return type ADBYID_LOAD_FAILURE', () => {
    const result = actions.adByIdLoadFailure(error);
    expect(result).toMatchObject(errorObject(ADBYID_LOAD_FAILURE));
  });
  test('adByIdEraseRequest must return type ADBYID_ERASE_REQUEST', () => {
    const result = actions.adByIdEraseRequest();
    expect(result.type).toBe(ADBYID_ERASE_REQUEST);
  });
  test('adByIdEraseSuccess must return type ADBYID_ERASE_SUCCESS', () => {
    const result = actions.adByIdEraseSuccess(data);
    expect(result).toMatchObject(successObject(ADBYID_ERASE_SUCCESS));
  });
  test('adByIdEraseFailure must return type ADBYID_ERASE_FAILURE', () => {
    const result = actions.adByIdEraseFailure(error);
    expect(result).toMatchObject(errorObject(ADBYID_ERASE_FAILURE));
  });
  test('adByIdEraseCancel must return type ADBYID_ERASE_CANCEL', () => {
    const result = actions.adByIdEraseCancel();
    expect(result.type).toBe(ADBYID_ERASE_CANCEL);
  });
  test('newAdRequest must return type NEWAD_REQUEST', () => {
    const result = actions.newAdRequest();
    expect(result.type).toBe(NEWAD_REQUEST);
  });
  test('newAdSuccess must return type NEWAD_SUCCESS', () => {
    const result = actions.newAdSuccess(data);
    expect(result).toMatchObject(successObject(NEWAD_SUCCESS));
  });
  test('newAdFailure must return type NEWAD_FAILURE', () => {
    const result = actions.newAdFailure(error);
    expect(result).toMatchObject(errorObject(NEWAD_FAILURE));
  });
  test('uiResetError must return type UI_RESET_ERROR', () => {
    const result = actions.uiResetError();
    expect(result.type).toBe(UI_RESET_ERROR);
  });
});

describe('Asynchronic actions tests', () => {
  const redirectionUrl = 'redirection';
  const dispatch = jest.fn();
  const getState = jest.fn();
  const router = {
    navigate: jest.fn(),
    state: {
      location: {
        state: {
          from: { pathname: redirectionUrl },
        },
      },
    },
  };

  beforeEach(() => {
    dispatch.mockClear();
    router.navigate.mockClear();
  });

  describe('authLogin action tests', () => {
    const credentials = {
      email: 'prueba@yo.com',
      password: 'hijk',
      remember: true,
    };
    const action = actions.authLogin(credentials);
    const api = { auth: {} };

    describe('when login resolves', () => {
      it('should follow the login flow', async () => {
        api.auth.login = jest.fn().mockResolvedValue();
        await action(dispatch, undefined, { api, router });

        expect.assertions(4);

        expect(dispatch).toHaveBeenNthCalledWith(1, actions.authLoginRequest());
        const { email, password, remember } = credentials;
        expect(api.auth.login).toHaveBeenCalledWith(
          { email, password },
          remember
        );
        expect(dispatch).toHaveBeenNthCalledWith(2, actions.authLoginSuccess());
        expect(router.navigate).toHaveBeenCalledWith(redirectionUrl, {
          replace: true,
        });
      });
    });

    describe('when login rejects', () => {
      const error = new Error('Bad values');
      it('should follow the error flow', async () => {
        api.auth.login = jest.fn().mockRejectedValue(error);

        await action(dispatch, undefined, { api });

        expect(dispatch).toHaveBeenNthCalledWith(1, actions.authLoginRequest());
        expect(dispatch).toHaveBeenNthCalledWith(
          2,
          actions.authLoginFailure(error)
        );
      });
    });

    api.auth = {};
  });

  describe('authLogout action tests', () => {
    const response = 'response';
    const actionWithResponse = actions.authLogout(response);
    const actionWithoutResponse = actions.authLogout();
    const api = { auth: {} };
    describe('when resolve', () => {
      it("should follow the logout path if there's a response", async () => {
        api.auth.handleLogout = jest.fn().mockResolvedValueOnce();
        await actionWithResponse(dispatch, undefined, { api, router });
        expect.assertions(3);
        expect(api.auth.handleLogout).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(actions.authLogoutSuccess());
        expect(router.navigate).toHaveBeenCalledWith(redirectionUrl, {
          replace: true,
        });
      });
      it("should cancel if there's no response", async () => {
        api.auth.handleLogout = jest.fn().mockResolvedValueOnce();
        await actionWithoutResponse(dispatch, undefined, { api });
        expect.assertions(1);
        expect(dispatch).toHaveBeenCalledWith(actions.authLogoutCancel());
      });
      api.auth = {};
    });

    describe('when reject', () => {
      it('should cancel and throw an error', async () => {
        api.auth.handleLogout = jest
          .fn()
          .mockRejectedValue(new Error('madremía'));
        try {
          const result = await actionWithResponse(dispatch, undefined, {
            api,
            router,
          });
        } catch (error) {
          expect(dispatch).toHaveBeenCalledWith(actions.authLogoutCancel());
        }
      });
    });
  });

  describe('getTagsAction tests', () => {
    const getState = jest.fn();
    const action = actions.getTagsAction();
    const api = { ads: {} };
    it('should follow the get tags flow if areTagsLoaded is false', async () => {
      jest.spyOn(selectors, 'areTagsLoaded').mockReturnValue(false);
      api.ads.getTags = jest.fn().mockResolvedValue('tags');

      const result = await action(dispatch, getState, { api });

      expect.assertions(3);
      expect(dispatch).toHaveBeenNthCalledWith(1, actions.tagsLoadRequest());
      expect(api.ads.getTags).toHaveBeenCalled();
      expect(dispatch).toHaveBeenNthCalledWith(
        2,
        actions.tagsLoadSuccess('tags')
      );

      jest.spyOn(selectors, 'areAdsLoaded').mockRestore();
    });
    it("should follow the failure flow if there's an error", async () => {
      jest.spyOn(selectors, 'areTagsLoaded').mockReturnValue(false);
      api.ads.getTags = jest.fn().mockRejectedValue('error');

      expect.assertions(1);
      try {
        const result = await action(dispatch, getState, { api });
      } catch (error) {
        expect.assertions(1);
        expect(error).toBe('error');
      }
      expect(dispatch).toHaveBeenCalledWith(actions.tagsLoadFailure('error'));

      jest.spyOn(selectors, 'areAdsLoaded').mockRestore();
    });
    it('should exit if the tags are loaded', async () => {
      jest.spyOn(selectors, 'areTagsLoaded').mockReturnValue(true);
      api.ads.getTags = jest.fn();

      expect.assertions(1);
      expect(dispatch).not.toHaveBeenCalled();

      jest.spyOn(selectors, 'areAdsLoaded').mockRestore();
    });
  });
});
