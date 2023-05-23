import { useForm } from 'react-hook-form';
import Button from '../../../components/Button/Button';
import { AppConstants, SUCCESS_CODE } from '../../../constants/app-constants';
import LabeledInput from '../../../components/LabeledInput/LabeledInput';
import { useState, useEffect, useCallback } from 'react';
import DatePickerButton from 'components/DatePickerButton/DatePickerButton';
import { useMutation } from 'react-query';
import { StringHelper } from 'utils/stringHelper';
import eventService from 'services/eventService';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Error from 'components/Error/Error';
import ConfirmationBox from 'components/ConfirmationBox/ConfirmationBox';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
/**
 * @description this function is use to enable the the user to login to the application
 * @version 1.0.0
 * @param {object} props - The props object
 * @param {function} props.changeState - A function to change the state of the parent component
 * @returns {JSX.Element}
 * @example
 * <EventForm changeState={handleChangeState} />
 */

const EventForm = (props) => {
  const { changeState } = props;
  const [show, setShow] = useState(false);
  const [buttonToggle, setToggle] = useState(true);
  const [FormData, setFormData] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleClose = () => {
    setShow(false);
  };
  const handleChange = () => {
    setToggle(false);
  };
  const {
    mutate: addEvent,
    isError,
    error,
    isLoading,
    isSuccess,
    data,
  } = useMutation(eventService.addEventService, {
    onSuccess: (data) => {
      handleEvents(data);
      changeState();
      reset();
    },
  });

  //toast message handler
  const handleEvents = (data) => {
    if (data.response) {
      if (data.response.status == 403) {
        toast.error(AppConstants.EVENTS_ERROR_MESSAGE.ALREADY_EXISTS_INPUT);
      } else if (data.response.status == 400) {
        toast.error(AppConstants.EVENTS_ERROR_MESSAGE.INVALID_INPUT);
      }
    } else if (data.status == 201) {
      toast.success(AppConstants.EVENTS_ERROR_MESSAGE.SUCCESS_INPUT);
    }
  };

  function formatDate(date) {
    const formattedDate = new Date(date).toISOString().slice(0, 19).replace('T', ' ');
    setValue(AppConstants.EVENTS_FORM_KEYS.EVENTS_START_DATE_KEY, formattedDate);
    return formattedDate;
  }
  const onSubmit = (data) => {
    setFormData(data);
    setShow(true);
  };

  const handleStartDateChange = useCallback((date) => {
    setValue(AppConstants.EVENTS_FORM_KEYS.EVENTS_START_DATE_KEY, date);
    setStartDate(date);
  }, []);

  const handleEndDateChange = useCallback((date) => {
    setValue(AppConstants.EVENTS_FORM_KEYS.EVENTS_END_DATE_KEY, date);
    setEndDate(date);
  }, []);

  const handleConfirmation = () => {
    FormData.startDate = formatDate(startDate);
    FormData.endDate = formatDate(endDate);
    setShow(false);
    setToggle(true);
    addEvent(FormData);
    reset({});
    setStartDate('');
    setEndDate('');
    setFormData('');
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <LabeledInput
          type={'text'}
          errors={errors}
          change={handleChange}
          name={AppConstants.EVENTS_FORM_KEYS.EVENT_NAME_KEY}
          labelText={AppConstants.EVENTS_FORM.EVENTS_NAME}
          register={register(AppConstants.EVENTS_FORM_KEYS.EVENT_NAME_KEY, {
            required: `${AppConstants.EVENTS_VALIDATION.EVENTS_MESSAGE_REQUIRED}`,
          })}
        />

        <DatePickerButton
          labelText={AppConstants.EVENTS_FORM.START_DATE}
          initialDate={startDate}
          onChange={handleStartDateChange}
          showTime={true}
          disabled={false}
          change={handleChange}
          errors={errors}
          register={register(AppConstants.EVENTS_FORM_KEYS.EVENTS_START_DATE_KEY, {
            required: `${AppConstants.EVENTS_VALIDATION.EVENTS_DATE_REQUIRED}`,
          })}
        />
        {errors.startDate && <ErrorMessage errors={errors.startDate.message} />}

        <DatePickerButton
          labelText={AppConstants.EVENTS_FORM.END_DATE}
          initialDate={endDate}
          onChange={handleEndDateChange}
          showTime={true}
          disabled={false}
          change={handleChange}
          errors={errors}
          register={register(AppConstants.EVENTS_FORM_KEYS.EVENTS_END_DATE_KEY, {
            required: `${AppConstants.EVENTS_VALIDATION.EVENTS_DATE_REQUIRED}`,
          })}
        />
        {errors.endDate && <ErrorMessage errors={errors.endDate.message} />}

        <h6>{AppConstants.EVENTS_NOTE.LABEL}</h6>
        <ol>
          {AppConstants.EVENTS_NOTE.NOTE.map((value, index) => {
            return <li key={index}>{StringHelper.boldDoubleQuotes(value)}</li>;
          })}
        </ol>
        <Button
          label={AppConstants.EVENTS_PAGE.FORM_TITLE}
          color={AppConstants.BUTTON.COLOR.PRIMARY}
          size={AppConstants.EVENTS_PAGE.BUTTON_SIZE}
        />
      </form>
      <ToastContainer />
      {show && (
        <ConfirmationBox
          title={AppConstants.EVENTS_CONFIRM_BOX.ADD_EVENT_TITLE}
          desc={AppConstants.EVENTS_CONFIRM_BOX.EVENTS_ADD_MESSAGE}
          button={AppConstants.CONFIG.CONFIRMATION_BOX.BUTTON}
          close={handleClose}
          click={handleConfirmation}
          disable={buttonToggle}
        />
      )}
    </>
  );
};

export default EventForm;
