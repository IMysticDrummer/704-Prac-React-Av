export const getIsLogged = (state) => state.auth.state;

export const getIsLogginout = (state) => state.auth.askingLogout;

export const getUi = (state) => state.ui;

export const areTagsLoaded = (state) => state.tags.areLoaded;

export const getTags = (state) => (state.tags.areLoaded ? state.tags.data : []);

export const areAdsLoaded = (state) => state.ads.areLoaded;

export const getAds = (state) => (state.ads.areLoaded ? state.ads.data : []);

export const getAdsNumber = (state) => state.ads.data.length;

export const getAdById = (adId) => (state) =>
  state.ads.data.find((ad) => ad.id.toString() === adId);

export const getAdIndexById = (adId) => (state) => {
  const idsEquals = (element) => element.id.toString() === adId;
  const index = state.ads.data.findIndex(idsEquals);
  return index;
};
