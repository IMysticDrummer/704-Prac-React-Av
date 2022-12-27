import {
  areAdsLoaded,
  areTagsLoaded,
  getAdById,
  getAdIndexById,
  getAds,
  getAdsNumber,
  getIsLogged,
  getIsLogginout,
  getTags,
  getUi,
} from '../selectors';

describe('selectors tests', () => {
  describe('getIsLogged', () => {
    it('should return auth.state from the state', () => {
      const value = true;
      const state = { auth: { state: value } };
      const result = getIsLogged(state);
      expect(result).toBeTruthy();
    });
  });
  describe('getIsLogginout', () => {
    it('should return auth.askingLogout from the state', () => {
      const value = true;
      const state = { auth: { askingLogout: value } };
      const result = getIsLogginout(state);
      expect(result).toBeTruthy();
    });
  });
  describe('getUi', () => {
    it('should return ui from the state', () => {
      const value = { isLoading: true };
      const state = { ui: value };
      const result = getUi(state);
      expect(result).toMatchObject(value);
    });
  });
  describe('areTagsLoaded', () => {
    it('should return tags.areLoaded from the state', () => {
      const value = true;
      const state = { tags: { areLoaded: value } };
      const result = areTagsLoaded(state);
      expect(result).toBeTruthy();
    });
  });
  describe('getTags', () => {
    it('should return tags from the state if they are loaded', () => {
      const tags = 'tags';
      const state = { tags: { areLoaded: true, data: tags } };
      const result = getTags(state);
      expect(result).toBe(tags);
    });
    it('should return empty array if tags are not loaded', () => {
      const tags = 'tags';
      const expected = [];
      const state = { tags: { areLoaded: false, data: tags } };
      const result = getTags(state);
      expect(result).not.toBe(tags);
      expect(result).toMatchObject(expected);
    });
  });

  describe('areAdsLoaded', () => {
    it('should return ads.areLoaded from the state', () => {
      const value = true;
      const state = { ads: { areLoaded: value } };
      const result = areAdsLoaded(state);
      expect(result).toBeTruthy();
    });
  });
  describe('getAds', () => {
    const ads = 'ads';
    it('should return ads from the state if they are loaded', () => {
      const state = { ads: { areLoaded: true, data: ads } };
      const result = getAds(state);
      expect(result).toBe(ads);
    });
    it('should return empty array if tags are not loaded', () => {
      const expected = [];
      const state = { ads: { areLoaded: false, data: ads } };
      const result = getAds(state);
      expect(result).not.toBe(ads);
      expect(result).toMatchObject(expected);
    });
  });
  describe('getAdsNumber', () => {
    it('should return the number of ads in state', () => {
      const value = ['one', 'two', 'three'];
      const state = { ads: { data: value } };
      const result = getAdsNumber(state);
      expect(result).toBe(3);
    });
    it("should return 0 if there's no ads in state", () => {
      const value = [];
      const state = { ads: { data: value } };
      const result = getAdsNumber(state);
      expect(result).toBe(0);
    });
    it('should return 0 if ads are undefined in state', () => {
      const state = { ads: {} };
      const result = getAdsNumber(state);
      expect(result).toBe(0);
    });
  });

  describe('getAdById', () => {
    it('should return the ad who has the same id', () => {
      const id = '1';
      const ads = [{ id: '1' }, { id: '2' }];
      const state = { ads: { data: ads } };
      const result = getAdById(id)(state);
      expect(result).toMatchObject({ id: '1' });
    });
    it('should return the first ad who has the same id', () => {
      const id = '1';
      const ads = [
        { id: '1', number: 1 },
        { id: '1', number: 2 },
      ];
      const state = { ads: { data: ads } };
      const result = getAdById(id)(state);
      expect(result).toMatchObject({ id: '1', number: 1 });
    });
    it("should return undefined if there's no ads in the state", () => {
      const id = '1';
      const ads = [];
      const state = { ads: { data: ads } };
      const result = getAdById(id)(state);
      expect(result).toBeUndefined();
    });
    it('should return undefined if ads are undefined in the state', () => {
      const id = '1';
      const state = { ads: {} };
      const result = getAdById(id)(state);
      expect(result).toBeUndefined();
    });
  });

  describe('getAdIndexById', () => {
    it('should return the index of the first ad who has the same id', () => {
      const id = '1';
      const ads = [{ id: '1' }, { id: '2' }];
      const state = { ads: { data: ads } };
      const result = getAdIndexById(id)(state);
      expect(result).toBe(0);
    });
    it("should return -1 if there's no ads in the state", () => {
      const id = '1';
      const ads = [];
      const state = { ads: { data: ads } };
      const result = getAdIndexById(id)(state);
      expect(result).toBe(-1);
    });
    it('should return undefined if ads are undefined in the state', () => {
      const id = '1';
      const state = { ads: {} };
      const result = getAdIndexById(id)(state);
      expect(result).toBeUndefined();
    });
  });
});
