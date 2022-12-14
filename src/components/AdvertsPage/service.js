import client from '../../api/client.js';

const advertisementsUrl = '/v1/adverts';

/**
 * Return the advertisement list form the API
 * @returns {Promise}
 */
export const getAdvertisements = () => {
  const url = advertisementsUrl;
  return client.get(url);
};

/**
 * Return an Advertisement selected by Id
 * @param {String} id Advertisement id
 * @returns {Promise}
 */
export const getAdById = (id) => {
  const url = advertisementsUrl + '/' + id;
  return client.get(url);
};

/**
 * Send a post request with an Advertisement to the API
 * @param {FormData} advertisement
 * @returns {Promise}
 */
export const postNewAd = (advertisement) => {
  const url = advertisementsUrl;

  return client.post(url, advertisement);
};

/**
 * Ask erase an advertisement by id to the API
 * @param {String} id Advertisement Id
 * @returns {Promise}
 */
export const eraseAd = (id) => {
  const url = advertisementsUrl;

  return client.delete(`${url}/${id}`);
};

/**
 * Ask for the tags collection aviable in the API
 * @returns {Promise}
 */
export const getTags = () => {
  const url = `${advertisementsUrl}/tags`;

  return client.get(url);
};
