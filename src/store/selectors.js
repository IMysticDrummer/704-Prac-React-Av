export const getIsLogged = (state) => state.auth.state;

export const getIsLogginout = (state) => state.auth.askingLogout;

export const getUi = (state) => state.ui;

export const areTagsLoaded = (state) => state.tags.areLoaded;

export const getTags = (state) => (state.tags.areLoaded ? state.tags.data : []);

export const areAdsLoaded = (state) => state.ads.areLoaded;

export const getAds = (state) => (state.ads.areLoaded ? state.ads.data : []);
