import { URL_CONSTANTS } from 'constants/url-constants';
import { SORT, PAGE, LIMIT, FIELD } from 'constants/app-constants';
import axios from 'axios';
/**
 * @description configurations for axios
 * @author [Hariboobaalan]
 */
const config = {
  headers: {
    Authorization: `Bearer ${document.cookie.split('; ')[0].split('=')[1]}`,
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
    return await axios
      .get(`${BASE_URL}${USERS}/${userId}`, config)
      .then((data) => data)
      .catch((error) => error);
  },
  getUsersService: async (currentPage = 1, sort = 'asc', colum = 'employeeId', current = 15) => {
    return axios
      .get(
        `${BASE_URL}${USER.USERS}?${SORT}=${sort}&${FIELD}=${colum}&${PAGE}=${currentPage}&${LIMIT}=${current}`,
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
    return await axios
      .get(`${BASE_URL}${USERS}/${BUSINESS_LOCATIONS}`, config)
      .then((data) => data)
      .catch((error) => error);
  },
};

export default UserServices;
