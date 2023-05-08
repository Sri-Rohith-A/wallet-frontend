import axios from 'axios';
/**
 * axios instance with base url and request header which will be added to all the
 * requests made with this instance
 */

const token = document.cookie
  ? document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='))
      .split('=')[1]
  : '';
// eslint-disable-next-line no-undef
const BASE_URL = process.env.REACT_APP_API_URL;
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
const apiInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

export { apiInstance };
