import axios from 'axios';

/**
 * Starts the axios client.
 * You must set the REACT_APP_API_BASE_URL in a .env file.
 * The .env file must be in the root path of the application.
 */
const client = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (!error.response) {
      return Promise.reject({ message: error.message });
    }
    return Promise.reject({
      message: error.response.data,
      status: error.status,
      ...error.response,
      ...error.response.data,
    });
  }
);

/**
 * Set the axios authorisation header
 * @param {string} token
 */
export const setAuthorizationHeader = (token) => {
  client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

/**
 * Removes the axios authorisation header
 */
export const removeAuthorizationHeader = () => {
  delete client.defaults.headers.common['Authorization'];
};

export default client;
