/**
 * @description function to return currency with comma formatter
 * @version 1.0.0
 * @author [Rakhesh Bowtham]
 * @returns comma formatter currency
 */

const CurrencyUtil = {
  currencyFormatters: (data) => {
    return data.toLocaleString();
  },
  indianRupeeSymbol: () => {
    return String.fromCharCode(0x20b9);
  },
};
export default CurrencyUtil;
