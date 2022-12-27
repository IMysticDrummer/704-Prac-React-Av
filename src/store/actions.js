import {
  areAdsLoaded,
  areTagsLoaded,
  getAdById,
  getAdIndexById,
  getAds,
  getAdsNumber,
} from './selectors.js';
import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  TAGS_LOAD_REQUEST,
  TAGS_LOAD_SUCCESS,
  TAGS_LOAD_FAILURE,
  ADS_LOAD_REQUEST,
  ADS_LOAD_SUCCESS,
  ADS_LOAD_FAILURE,
  UI_RESET_ERROR,
  AUTH_LOGOUT_REQUEST,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_CANCEL,
  ADBYID_LOAD_REQUEST,
  ADBYID_LOAD_SUCCESS,
  ADBYID_LOAD_FAILURE,
  ADBYID_ERASE_REQUEST,
  ADBYID_ERASE_SUCCESS,
  ADBYID_ERASE_FAILURE,
  ADBYID_ERASE_CANCEL,
  NEWAD_REQUEST,
  NEWAD_SUCCESS,
  NEWAD_FAILURE,
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
        dispatch(authLogoutCancel());
        throw error;
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
      dispatch(tagsLoadFailure(error));
    }
  };
}

export function adsLoadRequest() {
  return {
    type: ADS_LOAD_REQUEST,
  };
}
export function adsLoadSuccess(ads) {
  return {
    type: ADS_LOAD_SUCCESS,
    payload: ads,
  };
}
export function adsLoadFailure(error) {
  return {
    type: ADS_LOAD_FAILURE,
    payload: error,
    error: true,
  };
}

export function getAdsAction() {
  return async function (dispatch, getState, { api }) {
    const areLoaded = areAdsLoaded(getState());
    const adsNumber = getAdsNumber(getState());
    // Retry charge of advertisements if they're empty, although areLoaded be true
    // This evite that user get an empty list in this case, when user is not login:
    //  1- Put in the URL the direct direcction to an advertisement
    //  2- Application will redirect user to the login Page
    //  3- User does login and applicaton redirects to the advetisement detail. The rest of advertisements haven't been loaded
    //  4- User does the advertisement erase
    //  5- Application redirects to advertisements list. In this case, if we don't force the load of advertisements, user will get an empty advertisements list.
    if (areLoaded && adsNumber) return;

    try {
      dispatch(adsLoadRequest());
      const ads = await api.ads.getAdvertisements();
      // if (ads.length) {
      //   dispatch(getTagsAction());
      // }
      dispatch(adsLoadSuccess(ads));
    } catch (error) {
      dispatch(adsLoadFailure(error));
    }
  };
}

export function adByIdLoadRequest() {
  return {
    type: ADBYID_LOAD_REQUEST,
  };
}
export function adByIdLoadSuccess(ad) {
  return {
    type: ADBYID_LOAD_SUCCESS,
    payload: ad,
  };
}
export function adByIdLoadFailure(error) {
  return {
    type: ADBYID_LOAD_FAILURE,
    payload: error,
    error: true,
  };
}

export function adByIdLoadAction(id) {
  return async function (dispatch, getState, { api }) {
    const areLoaded = getAdById(id)(getState());
    if (areLoaded) return;

    try {
      dispatch(adByIdLoadRequest());
      const advert = await api.ads.getAdById(id);
      dispatch(adByIdLoadSuccess(advert));
    } catch (error) {
      dispatch(adByIdLoadFailure(error));
    }
  };
}

export function adByIdEraseRequest() {
  return {
    type: ADBYID_ERASE_REQUEST,
  };
}
export function adByIdEraseSuccess(ads) {
  return {
    type: ADBYID_ERASE_SUCCESS,
    payload: ads,
  };
}
export function adByIdEraseFailure(error) {
  return {
    type: ADBYID_ERASE_FAILURE,
    payload: error,
    error: true,
  };
}
export function adByIdEraseCancel() {
  return {
    type: ADBYID_ERASE_CANCEL,
  };
}

export function adByIdEraseAction(id) {
  return async function (dispatch, getState, { api, router }) {
    try {
      const ads = getAds(getState());
      const index = getAdIndexById(id)(getState());
      ads.splice(index, 1);
      await api.ads.eraseAd(id);
      dispatch(adByIdEraseSuccess(ads));
      router.navigate('/');
    } catch (error) {
      dispatch(adByIdEraseFailure(error));
    }
  };
}

export function newAdRequest() {
  return { type: NEWAD_REQUEST };
}
export function newAdSuccess(ad) {
  return { type: NEWAD_SUCCESS, payload: ad };
}
export function newAdFailure(error) {
  return { type: NEWAD_FAILURE, payload: error, error: true };
}

export function newAdAction(ad) {
  return async function (dispatch, getState, { api, router }) {
    try {
      dispatch(newAdRequest());
      const { id } = await api.ads.postNewAd(ad);
      const adCreated = await api.ads.getAdById(id);
      dispatch(newAdSuccess(adCreated));
      const to = `/adverts/${id}`;
      router.navigate(to, { replace: true });
    } catch (error) {
      dispatch(newAdFailure(error));
    }
  };
}

export function uiResetError() {
  return {
    type: UI_RESET_ERROR,
  };
}
