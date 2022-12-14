/**
 * Check if the advertisement name includes the name filter
 * @param {Advertisement} ad
 * @param {string} filters
 * @returns {Boolean}
 */
export const filterNameFunction = (ad, filters) => {
  if (filters.name?.length > 0) {
    const name = filters.name;
    if (name) {
      if (ad.name.toLowerCase().includes(name.toLowerCase())) return true;
    }
    return false;
  }
  return true;
};

/**
 * Check the advertisement tags are included in the filter array of tags recived
 * @param {Advertisement} ad
 * @param {Array} filters
 * @returns {Boolean}
 */
export const filterTagsFunction = (ad, filters) => {
  if (filters.tags?.length > 0) {
    for (let index = 0; index < filters.tags.length; index++) {
      if (!ad.tags.includes(filters.tags[index].toLowerCase())) return false;
    }
  }
  return true;
};

/**
 * Check if the advertisemen.sale is equal to the filter-shellFilter recived (should be 'shell' or 'buy')
 * @param {string} ad
 * @param {String} filters
 * @returns {Boolean}
 */
export const filterSellFunction = (ad, filters) => {
  if (filters.sellFilter !== '') {
    if (filters.sellFilter === 'sell') {
      return ad.sale;
    }
    return !ad.sale;
  }

  return true;
};

/**
 * Function that prepares the slider configuration, concerning the range and 4 marks to select in slider
 * @param {AdvertisementList} adsList
 * @returns {Object} {range: [minStep, maxStep], marks}
 */
export const calculateSliderRange = (adsList) => {
  const MAXSTEPS = 4;
  let marks = {};
  const minStep = Math.min(...adsList.map((a) => a.price));
  const maxStep = Math.max(...adsList.map((b) => b.price));

  let sliderStep = (maxStep - minStep) / 4;
  if (maxStep === minStep) sliderStep = 1;

  for (let index = 0; index <= MAXSTEPS; index++) {
    const mark =
      index === MAXSTEPS ? maxStep : Math.trunc(minStep + sliderStep * index);
    marks = {
      ...marks,
      [mark]: {
        style: { color: 'var(--main-color)' },
        label: `${mark}`,
      },
    };
  }
  return { range: [minStep, maxStep], marks };
};

/**
 * Check if the advertisement.price is includes in the filter-price range array given
 * @param {Advertisement} ad
 * @param {filters} filters
 * @returns {Boolean}
 */
export const filterPriceFunction = (ad, filters) => {
  if (filters.price) {
    if (ad.price >= filters.price[0] && ad.price <= filters.price[1])
      return true;
    return false;
  }
  return true;
};
