import { URL_CONSTANTS } from 'constants/url-constants';
import { SORT, PAGE, LIMIT, FIELD, TOKEN } from 'constants/app-constants';
import axios from 'axios';
import Cookies from 'js-cookie';
/**
 * @description configurations for axios
 * @author [Hariboobaalan]
 */
const token = Cookies.get(TOKEN);
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
const { USER, MANAGE_USERS } = URL_CONSTANTS;
const USERS = USER.USERS;
const STOP_MATERNITY_CASH = MANAGE_USERS.STOP_MATERNITY_CASH,
  BUSINESS_LOCATIONS = MANAGE_USERS.BUSINESS_LOCATIONS;
/**
 * @description Object of Functions to perform specific API calls using axios.
 * @author [Hariboobaalan]
 */
// eslint-disable-next-line no-undef
const BASE_URL = process.env.REACT_APP_API_URL;
const UserServices = {
  addUserService: async (userData) => {
    return await axios.post(`${BASE_URL}${USERS}`, userData, config).catch((error) => error);
  },
  getUserService: async (userId) => {
    if (isNaN(userId)) return;
    return await axios
      .get(`${BASE_URL}${USERS}/${userId}`, config)
      .then((data) => data)
      .catch((error) => error);
  },
  getUsersService: async (currentPage, sort, column, current) => {
    return axios
      .get(
        `${BASE_URL}${USER.USERS}?${SORT}=${sort}&${FIELD}=${column}&${PAGE}=${currentPage}&${LIMIT}=${current}`,
        config,
      )
      .then((data) => data)
      .catch((error) => error);
  },
  stopMaternityCashService: async (userId, updatedData) => {
    return axios
      .patch(
        `${BASE_URL}${USER.USERS}/${userId}/${MANAGE_USERS.STOP_MATERNITY_CASH}`,
        updatedData,
        config,
      )
      .then((data) => data)
      .catch((error) => error);
  },
  updateUserDataService: async (updatedUserData) => {
    const [userId, userData] = updatedUserData;
    return axios
      .patch(`${BASE_URL}${USERS}/${userId}`, userData, config)
      .then((data) => data)
      .catch((error) => error);
  },
  getBusinessAndLocations: async () => {
    return axios
      .get(`${BASE_URL}${USERS}/${BUSINESS_LOCATIONS}`, config)
      .then((data) => data)
      .catch((error) => error);
  },
  getUserTransactions: async (currentPage, sort, column, current, userId) => {
    return await axios
      .get(
        `${BASE_URL}${USERS}/${userId}${USER.TRANSACTIONS}?${SORT}=${sort}&${FIELD}=${column}&${PAGE}=${currentPage}&${LIMIT}=${current}`,
        config,
      )
      .then((data) => data)
      .catch((error) => error);
  },
};

export default UserServices;
