import axios from 'axios';
import Cookies from 'js-cookie';
import { TOKEN } from '../constants/app-constants';
/**
 * axios instance with base url and request header which will be added to all the
 * requests made with this instance
 */
const cookieToken = Cookies.get(TOKEN);
const token = cookieToken ? cookieToken : '';
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
