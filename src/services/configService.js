import { apiInstance } from '../api/axios-instance';
import { URL_CONSTANTS } from 'constants/url-constants';

const configGetService = async () => {
  try {
    const response = await apiInstance.get(URL_CONSTANTS.CONFIG.CONFIG_ENDPOINT);
    return response;
  } catch (error) {
    return error.response;
  }
};

const configPatchService = async (configUpdate) => {
  try {
    const response = await apiInstance.patch(URL_CONSTANTS.CONFIG.CONFIG_ENDPOINT, configUpdate);
    return response;
  } catch (error) {
    return error.response;
  }
};
export { configGetService, configPatchService };
