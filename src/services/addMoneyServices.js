/**
 * @description function to perform the add money API
 * @version 1.0.0
 * @author [Joel]
 * @returns {Api endpoint response}
 */
import { URL_CONSTANTS } from 'constants/url-constants';
import {
  CDW,
  MATERNITY,
  BUCKET_LIST,
  SEARCH_EMPLOYEE,
  SEARCH_QUERY,
  BUCKET_ID,
  EMPLOYEE,
  EVENTS,
  TOKEN,
} from 'constants/app-constants';
import axios from 'axios';
import Cookies from 'js-cookie';
/**
 * @description configurations for axios
 * @author [Joel]
 */
const token = Cookies.get(TOKEN);
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
// eslint-disable-next-line no-undef
const BASE_URL = process.env.REACT_APP_API_URL;
const { ADD_MONEY } = URL_CONSTANTS;
const addMoneyServices = {
  getCashBucket: async () => {
    return axios
      .get(`${BASE_URL}${ADD_MONEY.CASH}/${BUCKET_LIST}`, config)
      .then((data) => data)
      .catch((error) => error);
  },
  getEmployee: async (id, bucketId) => {
    return axios
      .get(
        `${BASE_URL}${ADD_MONEY.CASH}/${SEARCH_EMPLOYEE}?${SEARCH_QUERY}=${id}&${BUCKET_ID}=${bucketId}`,
        config,
      )
      .then((data) => data)
      .catch((error) => error);
  },
  getMaternity: async (id) => {
    return axios
      .get(`${BASE_URL}${ADD_MONEY.CASH}/${MATERNITY}?${EMPLOYEE}=${id}`, config)
      .then((data) => data)
      .catch((error) => error);
  },
  getCdw: async (id) => {
    return axios
      .get(`${BASE_URL}${ADD_MONEY.CASH}/${CDW}?${EMPLOYEE}=${id}`, config)
      .then((data) => data)
      .catch((error) => error);
  },
  getEvents: async () => {
    return axios
      .get(`${BASE_URL}${ADD_MONEY.CASH}/${EVENTS}`, config)
      .then((data) => data)
      .catch((error) => error);
  },
  addMoney: async (data) => {
    return axios
      .post(`${BASE_URL}${ADD_MONEY.CASH}`, data, config)
      .then((data) => data)
      .catch((error) => error);
  },
};

export default addMoneyServices;
