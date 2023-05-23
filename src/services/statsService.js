import { apiInstance } from '../api/axios-instance';
import { URL_CONSTANTS } from 'constants/url-constants';

const statsGetService = async (selectedData) => {
  try {
    const response = await apiInstance.get(
      `${URL_CONSTANTS.DASH_BOARD.DASH_BOARD_ENDPOINT}?${URL_CONSTANTS.DASH_BOARD.SALES}=${selectedData}`,
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export default statsGetService;
