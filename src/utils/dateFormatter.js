import { NUMERIC, SHORT, AppConstants } from 'constants/app-constants';
/**
 * @description this function is to format the data to reuired format like 01 ARP 2023
 * @version 1.0.0
 * @author [Rakhesh Bowtham]
 * @return Formatted Date
 */
const DateUtil = {
  dateFormatter: (dateStr) => {
    const date = new Date(dateStr);
    const day = date.toLocaleDateString(AppConstants.DATE_CONSTANTS.EN_US, { day: NUMERIC });
    const year = date.toLocaleDateString(AppConstants.DATE_CONSTANTS.EN_US, { year: NUMERIC });
    const month = date.toLocaleDateString(AppConstants.DATE_CONSTANTS.EN_US, { month: SHORT });
    return `${day} ${month} ${year}`;
  },
  dateTimeFormatter: (dateStr) => {
    const date = new Date(dateStr);
    const day = date.toLocaleDateString('en-US', { day: 'numeric' });
    const year = date.toLocaleDateString('en-US', { year: 'numeric' });
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const time = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    return `${day} ${month} ${year} ${time}`;
  },
};
export default DateUtil;
