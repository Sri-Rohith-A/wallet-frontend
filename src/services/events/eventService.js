import axios from 'axios';
import { URL_CONSTANTS } from 'constants/url-constants';
// eslint-disable-next-line no-undef
const BASE_URL = process.env.REACT_APP_API_URL;
const config = {
  headers: {
    Authorization: `Bearer ${
      document.cookie &&
      document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))
        .split('=')[1]
    }`,
  },
};
const eventService = {
  onLoadEventService: async () => {},
  addEventService: async (data) => {
    return axios
      .post(`${BASE_URL}${URL_CONSTANTS.EVENTS.EVENTS_ENDPOINT}`, data, config)
      .then((data) => data)
      .catch((error) => error);
  },
};
export default eventService;
