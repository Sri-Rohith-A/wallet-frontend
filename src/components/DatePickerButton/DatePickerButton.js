import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { RiCalendar2Fill as CalendarIcon } from 'react-icons/ri';
import styles from './DatePickerButton.module.scss';
import PropTypes from 'prop-types';
import { Label } from 'components/form-inputs/label/Label';

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

const DatePickerButton = (props) => {
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

  const CustomInput = ({ value, onClick, readOnly }) => (
    <>
      {/* Input container for the date picker */}
      <div className={styles['date-time-picker']}>
        <Label name={labelText} color={'black'} />

        <div className={styles['input-container']}>
          <input
            className={`${styles['date-input']} ${disabled ? styles['date-input-disabled'] : ''}`}
            type='text'
            value={value}
            readOnly={readOnly}
            {...register}
          />
          <CalendarIcon className={styles['calendar-icon']} onClick={onClick} />
        </div>
      </div>
    </>
  );

  const today = new Date();

  const minDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);

  const maxDate = new Date();

  maxDate.setFullYear(today.getFullYear() + 1);

  maxDate.setMonth(today.getMonth());

  return (
    <>
      <div className={styles['date-picker-container']}>
        <DatePicker
          selected={initialDate}
          onChange={handleDateChange}
          showTimeSelect={showTime}
          timeFormat='HH:mm'
          timeIntervals={1}
          dateFormat={showTime ? 'yyyy-MM-dd hh:mm a' : 'dd-MM-yyyy'}
          customInput={<CustomInput />}
          shouldCloseOnSelect={false}
          disabled={disabled}
          minDate={minDate}
          maxDate={maxDate}
        />
      </div>
    </>
  );
};

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
