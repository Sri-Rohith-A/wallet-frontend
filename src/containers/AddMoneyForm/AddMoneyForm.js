import style from './AddMoneyForm.module.scss';
import Dropdown from 'components/Dropdown/Dropdown';
import TypeAhead from 'components/TypeAhead/TypeAhead';
import { Label } from 'components/form-inputs/label/Label';
import Button from 'components/Button/Button';
import Input from 'components/form-inputs/input/Input';
import DatePickerButton from 'components/DatePickerButton/DatePickerButton';
import { StringHelper } from 'utils/stringHelper';
import Error from 'components/Error/Error';
import { AppConstants } from 'constants/app-constants';
import ConfirmationBox from 'components/ConfirmationBox/ConfirmationBox';
import {
  CDW,
  EVENT,
  MATERNITY,
  CDW_CASH,
  MATERNITY_CASH,
  EVENT_CASH,
  TRANSACTION_DETAILS,
  RECIPIENT_DETAILS,
  AMOUNT_ADDED,
  CDW_INFO,
  MATERNITY_INFO,
  START_DATE,
  END_DATE,
  EMPLOYEE_ID,
  SELECT_BUCKET,
  SELECT_EVENT,
  ADD_MONEY,
  CDW_ID,
  MATERNITY_ID,
  BLACK,
  STRING,
  CASH,
  EVENTS,
  CASH_ADDED,
  EVENT_NAME,
  CASH_NAME,
  AMOUNT,
  SELECT_EVENTS,
  THREE,
  EVENTS_ERROR_MESSAGE,
  QUERY,
  ADD_MONEY_ERROR_MESSAGE,
} from 'constants/app-constants';
import { PropTypes } from 'prop-types';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { nameToIdMapper } from 'utils/nameToIdMapper';
import addMoneyServices from 'services/addMoneyServices';
import Info from 'components/Info/Info';
import { useMutation } from 'react-query';
import { addCdwCash } from 'hooks/useAddMoneyData/useAddMoneyData';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DateConvertor from 'utils/dateConvertor';

/**
 * @description Add Money Form Container
 * @version 1.0.0
 * @author [Joel]
 */
const AddMoneyForm = ({ cashData, data }) => {
  const [selectedBucket, setSelectedBucket] = useState({
    bucketName: CDW,
    bucketId: CDW_ID,
    cashName: CDW_CASH,
  });
  const [selectedEvent, setSelectedEvent] = useState({ eventName: SELECT_EVENTS });
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [query, setQuery] = useState('');
  const [options, setOptions] = useState([]);
  const [cash, setCash] = useState('');
  const [event, setEvent] = useState([]);
  const [events, setEvents] = useState('');
  const [employeeId, setEmployeeId] = useState();
  const [show, setShow] = useState('');
  const [buttonToggle, setToggle] = useState(true);
  const [formData, setFormData] = useState({});

  /**
   * @description function to fetch bucket and search functionality
   * @version 1.0.0
   * @returns employee id and name and sets state
   */
  const fetchSearch = async () => {
    if (query && query.length >= THREE) {
      const results = await addMoneyServices.getEmployee(
        query.split(' ')[0],
        selectedBucket.bucketId,
      );
      results.data.data = results.data.data.map((emp) => {
        return emp.employeeId + ' - ' + StringHelper.capitalizeFirstLetter(emp.employeeName);
      });
      setOptions(results.data.data);
    } else {
      setOptions([]);
    }
  };
  const { mutate: addCDWCash } = useMutation(addCdwCash, {
    onSuccess: (submitData) => {
      handleCashSubmit(submitData);
    },
  });

  const handleCashSubmit = (submitData) => {
    if (submitData.response) {
      const errors = submitData.response.data.data;
      for (let error of errors) toast.error(error, { autoClose: true });
    } else {
      toast.success(CASH_ADDED, { autoClose: true });
    }
  };

  const handleSetQuery = (query) => {
    setQuery(query);
    setValue(QUERY, query);
    if (options.includes(query)) {
      fetchCash(query);
    } else {
      setCash('');
    }
  };

  const handleCashInput = (event) => {
    setCash(event.target.value);
    setValue('cash', event.target.value);
  };

  const handleClose = () => {
    setShow(false);
  };

  const resetForm = () => {
    setCash('');
    setQuery('');
    setOptions([]);
    setSelectedEvent({ eventName: SELECT_EVENTS });
    setStartDate('');
    setEndDate('');
    reset();
  };

  useEffect(() => {
    fetchEvent();
    fetchDate();
  }, [cash, selectedEvent, selectedBucket]);

  useEffect(() => {
    fetchSearch();
  }, [query]);

  /**
   * @description function to fetch cash based on cdw or maternity cash
   * @version 1.0.0
   */
  const fetchCash = async (query) => {
    let result = null;
    let empId = query.split(' ')[0];
    let bucketName = StringHelper.toLower(selectedBucket.bucketName.split(' ')[0]);
    if (empId.length > 3) {
      switch (bucketName) {
        case CDW:
          result = await addMoneyServices.getCdw(empId);
          break;
        case MATERNITY:
          result = await addMoneyServices.getMaternity(empId);
          break;
        case EVENT:
          result = { response: true };
          break;
      }
      setEmployeeId(empId);
      if (result.response) {
        setCash('');
      } else {
        setCash(result.data.data.cash);
        setValue(AMOUNT, result.data.data.cash);
      }
    }
  };

  /**
   * @description function to filter events date according to date format
   * @version 1.0.0
   */
  const fetchDate = () => {
    if (events.length > 0 && selectedEvent.startDate) {
      setStartDate(new Date(DateConvertor.convertDateToString(selectedEvent.startDate)));
      setEndDate(new Date(DateConvertor.convertDateToString(selectedEvent.endDate)));
    }
  };

  /**
   * @description function to fetch event details with dropdown and details
   * @version 1.0.0
   */
  const fetchEvent = async () => {
    if (StringHelper.toLower(selectedBucket.bucketName.split(' ')[0]) === EVENT) {
      let event = await addMoneyServices.getEvents();
      if (event) {
        const events = await event.data.data.map((event) => event.eventName);
        setEvent(events);
        setEvents(event.data.data);
      }
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  /**
   * @description function to give onSubmit and call post api
   * @version 1.0.0
   * @param data
   */
  const handleConfirmation = () => {
    const cdwSubmit = {
      employeeId: employeeId,
      cashTypeId: selectedBucket.bucketId,
      amount: cash,
      bucketName: selectedBucket.bucketName,
    };

    const maternitySubmit = {
      bucketName: selectedBucket.bucketName,
      cashTypeId: selectedBucket.bucketId,
      startDate: DateConvertor.dateFormatter(startDate) + '',
      endDate: DateConvertor.dateFormatter(endDate) + '',
      amount: cash,
      employeeId: employeeId,
    };
    const eventSubmit = {
      eventName: selectedEvent.eventName,
      eventId: selectedEvent.eventId,
      bucketName: selectedBucket.bucketName,
      cashTypeId: selectedBucket.bucketId,
      startDate: DateConvertor.dateFormatter(startDate) + '',
      endDate: DateConvertor.dateFormatter(endDate) + '',
      amount: formData.cash,
      employeeId: employeeId,
    };
    resetForm();
    if (selectedBucket.bucketId === CDW_ID) {
      addCDWCash(cdwSubmit);
    } else if (selectedBucket.bucketId === MATERNITY_ID) {
      addCDWCash(maternitySubmit);
    } else {
      addCDWCash(eventSubmit);
    }
    setShow(false);
  };

  const onSubmit = (data) => {
    setFormData(data);
    setShow(true);
  };

  const disableButton = () => {
    let disable = true;
    switch (selectedBucket.bucketName) {
      case CDW:
        employeeId != null && cash != '' ? (disable = false) : (disable = true);
        break;
      case MATERNITY:
        startDate != '' && endDate != '' && employeeId != null
          ? (disable = false)
          : (disable = true);
        break;
      case EVENT:
        selectedEvent.eventName != null && selectedEvent.eventId != null && employeeId != null
          ? (disable = false)
          : (disable = true);
        break;
    }
    return disable;
  };
  /**
   * @description function to get selected event name
   * @version 1.0.0
   * @param eventName
   */
  const getSeletedEvent = (eventName) => {
    let id = nameToIdMapper(eventName, events, EVENT_NAME)();
    setSelectedEvent({
      eventName: eventName,
      eventId: id.eventId,
      startDate: id.startDate,
      endDate: id.endDate,
    });
  };

  /**
   * @description function to get selected bucket
   * @version 1.0.0
   * @param name
   */
  const getSelectedBucket = (name) => {
    for (var i = 0; i < cashData.length; i++) {
      cashData[i].cashName = data[i];
    }
    let id = nameToIdMapper(name, cashData, CASH_NAME)();
    resetForm();
    setSelectedBucket((previousBucket) => {
      return {
        ...previousBucket,
        cashName: id.cashName,
        bucketName: id.cashType,
        bucketId: id.cashTypeId,
      };
    });
  };

  return (
    <>
      <form className={style['parent-form']} onSubmit={handleSubmit(onSubmit)}>
        <div className={style['form-section']}>
          <div className={style['transaction-section']}>
            <h5>{TRANSACTION_DETAILS}</h5>
            <div className={style['label']}>
              <Label name={SELECT_BUCKET} color={BLACK}></Label>
            </div>
            <div className={style['dropdown']}>
              {data && (
                <Dropdown
                  options={data}
                  selected={selectedBucket.cashName}
                  setSelected={getSelectedBucket}
                />
              )}
            </div>
            {selectedBucket.cashName === EVENT_CASH ? (
              <>
                <div className={style['label']}>
                  <Label name={SELECT_EVENT} color={BLACK}></Label>
                </div>
                <div className={style['dropdown']}>
                  {data && (
                    <Dropdown
                      options={event}
                      selected={selectedEvent.eventName}
                      setSelected={getSeletedEvent}
                    />
                  )}
                </div>
              </>
            ) : (
              <></>
            )}
            <div className={style['label']}>
              <Label name={AMOUNT_ADDED} color={BLACK}></Label>
            </div>
            <div className={style['input']}>
              <Input
                type={STRING}
                name={AMOUNT}
                defaultValue={
                  selectedBucket.cashName === CDW_CASH || selectedBucket.cashName === MATERNITY_CASH
                    ? cash
                    : 0
                }
                value={cash}
                change={handleCashInput}
                register={register(AMOUNT, {
                  min: { value: 1, message: ADD_MONEY_ERROR_MESSAGE.INVALID_CASH },
                  required: ADD_MONEY_ERROR_MESSAGE.EMPTY_CASH,
                })}
                disabled={
                  selectedBucket.cashName === CDW_CASH || selectedBucket.cashName === MATERNITY_CASH
                    ? true
                    : false
                }
                errors={errors}
              ></Input>
            </div>
            {selectedBucket.cashName === CDW_CASH ? <Info message={CDW_INFO} /> : ''}
            {selectedBucket.cashName != CDW_CASH ? (
              <>
                <div className={style['date']}>
                  <DatePickerButton
                    disabled={selectedBucket.cashName != MATERNITY_CASH ? true : false}
                    showTime={true}
                    initialDate={startDate}
                    onChange={setStartDate}
                    labelText={START_DATE}
                  ></DatePickerButton>
                </div>
                <div className={style['date']}>
                  <DatePickerButton
                    disabled={selectedBucket.cashName != MATERNITY_CASH ? true : false}
                    showTime={true}
                    initialDate={endDate}
                    onChange={setEndDate}
                    labelText={END_DATE}
                  ></DatePickerButton>
                </div>
              </>
            ) : (
              ''
            )}
            {selectedBucket.cashName === MATERNITY_CASH ? <Info message={MATERNITY_INFO} /> : ''}
          </div>
          <div className={style['recipient-section']}>
            <h5>{RECIPIENT_DETAILS}</h5>
            <div className={style['label']}>
              <Label name={EMPLOYEE_ID} color={BLACK}></Label>
            </div>
            <div className={style['typehead']}>
              <TypeAhead
                options={options}
                query={query}
                setQuery={handleSetQuery}
                register={register(QUERY, {
                  validate: {
                    required: (v) =>
                      (query.length >= 3 && options.includes(v)) ||
                      ADD_MONEY_ERROR_MESSAGE.INVALID_SEARCH,
                  },
                })}
              />
              <Error name={QUERY} errors={errors} />
            </div>
          </div>
        </div>
        <Button
          color={AppConstants.BUTTON.COLOR.PRIMARY}
          size={AppConstants.BUTTON.SIZE.XXL}
          label={ADD_MONEY}
          className={style['submit-button']}
          disable={disableButton()}
        ></Button>
      </form>
      <ToastContainer />
      {show && (
        <ConfirmationBox
          title={selectedBucket.cashName}
          desc={AppConstants.ADD_MONEY_CONFIRM_DESCRIPTION.CONFIRM_DESCRIPTION}
          close={handleClose}
          click={handleConfirmation}
          disable={buttonToggle}
        />
      )}
    </>
  );
};
AddMoneyForm.propTypes = {
  cashData: PropTypes.array,
  data: PropTypes.array,
};

export default AddMoneyForm;
