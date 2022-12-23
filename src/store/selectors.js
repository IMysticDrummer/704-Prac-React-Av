export const getIsLogged = (state) => state.auth;

export const getUi = (state) => state.ui;

export const areTagsLoaded = (state) => state.tags.areLoaded;

export const getTags = (state) => (state.tags.areLoaded ? state.tags.data : []);
