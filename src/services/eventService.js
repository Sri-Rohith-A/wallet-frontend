import axios from 'axios';
import { URL_CONSTANTS } from 'constants/url-constants';
import { apiInstance } from 'api/axios-instance';
import Cookies from 'js-cookie';
import { SORT, PAGE, LIMIT, FIELD, TOKEN, ASC, AppConstants } from 'constants/app-constants';
const { EVENTS } = URL_CONSTANTS;

// eslint-disable-next-line no-undef
const BASE_URL = process.env.REACT_APP_API_URL;
const token = Cookies.get(TOKEN);
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const EventService = {
  onLoadEventService: async (
    currentPage = 1,
    sort = ASC,
    colum = AppConstants.SORT_FIELD.EVENT_ID,
    current,
  ) => {
    return axios
      .get(
        `${BASE_URL}${EVENTS.ADD_EVENTS_ENDPOINT}?${SORT}=${sort}&${FIELD}=${colum}&${PAGE}=${currentPage}&${LIMIT}=${current}`,
        config,
      )
      .then((data) => data)
      .catch((error) => error);
  },
  addEventService: async (data) => {
    return axios
      .post(`${BASE_URL}${URL_CONSTANTS.EVENTS.ADD_EVENTS_ENDPOINT}`, data, config)
      .then((data) => data)
      .catch((error) => error);
  },
  startEventService: async (body) => {
    try {
      const { data, id } = body;
      return axios.patch(
        `${BASE_URL}${URL_CONSTANTS.EVENTS.ADD_EVENTS_ENDPOINT}/${id}`,
        data,
        config,
      );
    } catch (error) {
      return error.response;
    }
  },
  stopEventService: async (body) => {
    try {
      const { data, id } = body;
      return axios.patch(
        `${BASE_URL}${URL_CONSTANTS.EVENTS.ADD_EVENTS_ENDPOINT}/${id}`,
        data,
        config,
      );
    } catch (error) {
      return error.response;
    }
  },
  deleteEventService: async (id) => {
    try {
      return axios.delete(`${BASE_URL}${URL_CONSTANTS.EVENTS.ADD_EVENTS_ENDPOINT}/${id}`, config);
    } catch (error) {
      return error.response;
    }
  },
};
export default EventService;
