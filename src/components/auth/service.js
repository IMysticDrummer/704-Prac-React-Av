import client, {
  removeAuthorizationHeader,
  setAuthorizationHeader,
} from '../../api/client';
import storage from '../../utils/storage';

/**
 * Login in API. Save the token if the remember option has been checked
 * @param {Object} credentials {mail, password}
 * @param {Boolean} remember
 * @returns {Promise}
 */
export const login = (credentials, remember) => {
  return client.post('/auth/login', credentials).then(({ accessToken }) => {
    setAuthorizationHeader(accessToken);
    remember && storage.set('token', accessToken);
  });
};

/**
 * Send the signup request to the API
 * @param {Object} credentials {name, username, mail, password}
 * @returns {Promise}
 */
export const signup = (credentials) => {
  return client.post('/auth/signup', credentials);
};

/**
 * Check and return the accestoken to the API
 * @returns {String} accessToken
 */
export const checkLogged = () => {
  const accessToken = storage.get('token');
  setAuthorizationHeader(accessToken);
  return accessToken;
};

/**
 * Removes the authorisation
 */
export const handleLogout = () => {
  removeAuthorizationHeader();
  storage.remove('token');
};
