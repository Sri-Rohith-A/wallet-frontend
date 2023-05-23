import axios from 'axios';
import { URL_CONSTANTS } from 'constants/url-constants';
import { AppConstants, SORT, FIELD, LIMIT, PAGE } from 'constants/app-constants';
const { REPORTS } = URL_CONSTANTS;

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
const ReportsServices = {
  onLoadReportService: async () => {
    return axios
      .get(`${BASE_URL}${REPORTS.REPORT_FILTER_ENDPOINT}`, config)
      .then((data) => data)
      .catch((error) => error);
  },
  getReportsService: async (query, currentPage, sort, column, currentRows) => {
    return axios
      .get(
        `${BASE_URL}${REPORTS.REPORTS}?${query}&${PAGE}=${currentPage}&${FIELD}=${column}&${SORT}=${sort}&${LIMIT}=${currentRows}`,
        config,
      )
      .then((data) => data)
      .catch((error) => error);
  },
};
export default ReportsServices;
