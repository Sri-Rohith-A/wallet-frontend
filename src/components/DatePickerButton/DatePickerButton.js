import { React, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { RiCalendar2Fill as CalendarIcon } from 'react-icons/ri';
import styles from './DatePickerButton.module.scss';
import PropTypes from 'prop-types';
import { Label } from 'components/form-inputs/label/Label';
import Input from 'components/form-inputs/input/Input';
import { BLACK, TIME_FORMAT, DATE_FORMAT, DATE_TIME_FORMAT } from 'constants/app-constants';
/**
 * @decription A reusable date picker component with a customizable input field and date selection options.
 * @version 1.0.0
 * @param {string} initialDate
 * @param {boolean} showTime
 * @param {boolean} disabled
 * @param {string} initialDate
 * @param {boolean} showTime
 * @param {boolean} disabled
 * @author [Pavithra G]
 */
const DatePickerButton = forwardRef((props, _refs) => {
  const { initialDate, onChange, showTime, disabled, labelText, register } = props;

  /**
   * @decription Callback function to handle date selection in the date picker.
   * @param {Date} date
   */
  const handleDateChange = (date) => {
    onChange(date);
  };

  /**
   * @decription A custom input component that displays a date input field with a calendar icon.
   * @param {string} value
   * @param {function} onClick
   * @param {boolean} readOnly
   **/
  // eslint-disable-next-line react/display-name
  const CustomInput = forwardRef(({ value, onClick, readOnly }, ref) => (
    <>
      {/* Input container for the date picker */}
      <div className={styles['date-time-picker']} ref={ref}>
        <Label name={labelText} color={BLACK} />
        <div className={styles['input-container']}>
          <Input
            className={`${styles['date-input']} ${disabled ? styles['date-input-disabled'] : ''}`}
            disabled={disabled}
            type='text'
            defaultValue={value}
            readOnly={readOnly}
          />
          <CalendarIcon
            className={styles['calendar-icon']}
            onClick={() => {
              onClick();
            }}
          />
        </div>
      </div>
    </>
  ));

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);

  return (
    <>
      <div className={styles['date-picker-container']}>
        <DatePicker
          selected={initialDate}
          value={initialDate}
          onChange={handleDateChange}
          showTimeSelect={showTime}
          timeFormat={TIME_FORMAT}
          timeIntervals={1}
          dateFormat={showTime ? 'yyyy-MM-dd hh:mm a' : 'dd-MM-yyyy'}
          customInput={<CustomInput ref={register} />}
          shouldCloseOnSelect={false}
          disabled={disabled}
          minDate={minDate}
        />
      </div>
    </>
  );
});

DatePickerButton.displayName = 'DatePickerButton';

// PropTypes for DatePickerButton component
DatePickerButton.propTypes = {
  initialDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  showTime: PropTypes.bool,
  disabled: PropTypes.bool.isRequired,
  labelText: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  register: PropTypes.object,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onClick: PropTypes.func,
  readOnly: PropTypes.any,
};

export default DatePickerButton;
