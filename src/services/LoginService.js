import { apiInstance } from '../api/axios-instance';
import { URL_CONSTANTS } from 'constants/url-constants';

/**
 * @description function to get the login respose
 * @version 1.0.0
 * @author [Vishnuraj]
 * @param userCreds
 * @returns {Api endpoint response}
 */

const loginService = async (userCreds) => {
  try {
    const response = await apiInstance.post(URL_CONSTANTS.LOGIN.LOGIN_ENDPOINT, userCreds);
    return response;
  } catch (error) {
    return error.response;
  }
};
export default loginService;
