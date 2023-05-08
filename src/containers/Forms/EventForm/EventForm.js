import { useForm } from 'react-hook-form';
import Button from '../../../components/Button/Button';
import { AppConstants } from '../../../constants/app-constants';
import LabeledInput from '../../../components/LabeledInput/LabeledInput';
import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import DatePickerButton from 'components/DatePickerButton/DatePickerButton';
import { useMutation } from 'react-query';
import { StringHelper } from 'utils/stringHelper';
import eventService from 'services/eventService';
import { func } from 'prop-types';
/**
 * @description this function is use to enable the the user to login to the application
 * @version 1.0.0
 * @author [Pavithra G,Abdul Adhil]
 */
const EventForm = (props) => {
  const { changeState } = props;
  const { register, handleSubmit, reset } = useForm();
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());

  const {
    mutate: addEvent,
    isError,
    error,
    isLoading,
    isSuccess,
  } = useMutation(eventService.addEventService);

  useEffect(() => {
    if (isSuccess) {
      changeState();
      reset();
    }
  }, [isSuccess]);
  function formatDate(date) {
    const formattedDate = new Date(date).toISOString().slice(0, 19).replace('T', ' ');
    return formattedDate;
  }

  const onSubmit = (data) => {
    data.startDate = formatDate(selectedStartDate);
    data.endDate = formatDate(selectedEndDate);
    addEvent(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <LabeledInput
        type={'text'}
        name={AppConstants.EVENTS_FORM.EVENTS_NAME}
        register={register(AppConstants.EVENTS_FORM_KEYS.EVENT_NAME_KEY)}
      />
      <DatePickerButton
        labelText={AppConstants.EVENTS_FORM.START_DATE}
        initialDate={selectedStartDate}
        onChange={setSelectedStartDate}
        showTime={true}
        disabled={false}
        register={register(AppConstants.EVENTS_FORM_KEYS.EVENTS_START_DATE_KEY)}
      />
      <DatePickerButton
        labelText={AppConstants.EVENTS_FORM.END_DATE}
        initialDate={selectedEndDate}
        onChange={setSelectedEndDate}
        showTime={true}
        disabled={false}
        register={register(AppConstants.EVENTS_FORM_KEYS.EVENTS_END_DATE_KEY)}
      />
      <h6>{AppConstants.EVENTS_NOTE.LABEL}</h6>
      <ol>
        {AppConstants.EVENTS_NOTE.NOTE.map((value, index) => {
          return <li key={index}>{StringHelper.boldDoubleQuotes(value)}</li>;
        })}
      </ol>
      <Button
        label={AppConstants.EVENTS_PAGE.FORM_TITLE}
        color={AppConstants.BUTTON.BUTTON_COLOR_PRIMARY}
        size={AppConstants.EVENTS_PAGE.BUTTON_SIZE}
      />
    </form>
  );
};

export default EventForm;
