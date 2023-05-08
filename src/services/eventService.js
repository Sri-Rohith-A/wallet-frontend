import axios from 'axios';
import { URL_CONSTANTS } from 'constants/url-constants';
import { apiInstance } from 'api/axios-instance';
// eslint-disable-next-line no-undef
const BASE_URL = process.env.REACT_APP_API_URL;
const config = {
  headers: {
    Authorization: `Bearer ${
      document.cookie
        ? document.cookie
            .split('; ')
            .find((row) => row.startsWith('token='))
            .split('=')[1]
        : ''
    }`,
  },
};
const EventService = {
  onLoadEventService: async () => {
    try {
      const response = await apiInstance.get(URL_CONSTANTS.EVENTS.EVENT_ENDPOINT);
      return response;
    } catch (error) {
      return error.response;
    }
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
