/**
 * @description this function is to format the data
 * @version 1.0.0
 * @author [Joel]
 * @return Formatted Date
 */
const DateConvertor = {
  dateFormatter: (date) => {
    if (date === '') return;
    let dateAndTime =
      date.getFullYear() +
      '-' +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + date.getDate()).slice(-2) +
      ' ' +
      ('0' + (date.getHours() + 1)).slice(-2) +
      ':' +
      ('0' + (date.getMinutes() + 1)).slice(-2) +
      ':' +
      ('0' + (date.getSeconds() + 1)).slice(-2) +
      '';
    return dateAndTime;
  },
  convertDateToString: (date) => {
    let dateStr =
      date.substring(6, 10) +
      '-' +
      date.substring(3, 5) +
      '-' +
      date.substring(0, 2) +
      ' ' +
      date.substring(11, 13) +
      ':' +
      date.substring(14, 16) +
      ':' +
      date.substring(17, 19);
    return dateStr;
  },
};
export default DateConvertor;
