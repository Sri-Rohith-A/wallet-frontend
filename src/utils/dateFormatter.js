/**
 * @description this function is to format the data to reuired format like 01 ARP 2023
 * @version 1.0.0
 * @author [Rakhesh Bowtham]
 * @return Formatted Date
 */
const DateUtil = {
  dateFormatter: (dateStr) => {
    const date = new Date(dateStr);
    const day = date.toLocaleDateString('en-US', { day: 'numeric' });
    const year = date.toLocaleDateString('en-US', { year: 'numeric' });
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    return `${day} ${month} ${year}`;
  },
};
export default DateUtil;
