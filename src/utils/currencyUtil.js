import { AppConstants } from 'constants/app-constants';
/**
 * @description function to return currency with comma formatter
 * @version 1.0.0
 * @author [Rakhesh Bowtham]
 * @returns comma formatter currency
 */

const CurrencyUtil = {
  currencyFormatters: (data) => {
    const options = {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    };
    return Number(data).toLocaleString(AppConstants.DATE_CONSTANTS.EN_IN, options);
  },
  indianRupeeSymbol: () => {
    return String.fromCharCode(0x20b9);
  },
};
export default CurrencyUtil;
