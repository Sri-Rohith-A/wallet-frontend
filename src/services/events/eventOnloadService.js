import { apiInstance } from 'api/axios-instance';
import { URL_CONSTANTS } from 'constants/url-constants';

const eventOnLoadService = async () => {
  try {
    const response = await apiInstance.get(URL_CONSTANTS.EVENTS.EVENTS_ENDPOINT);
    return response;
  } catch (error) {
    return error.response;
  }
};

export default eventOnLoadService;
