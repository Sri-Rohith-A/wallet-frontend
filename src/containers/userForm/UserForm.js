import { useEffect, useState } from 'react';
import style from './UserForm.module.scss';
import LabeledInput from 'components/LabeledInput/LabeledInput';
import { useForm } from 'react-hook-form';
import { AppConstants } from '../../constants/app-constants';
import RadioGroup from '../../components/form-inputs/RadioGroup/RadioGroup';
import { OverlayModal } from '../../components/OverlayModal/OverlayModal';
import PropTypes from 'prop-types';
import Button from 'components/Button/Button';
import Dropdown from 'components/Dropdown/Dropdown';
import { Label } from 'components/form-inputs/label/Label';
import DatePickerButton from 'components/DatePickerButton/DatePickerButton';
import UserServices from 'services/userService';
import {
  usePostUserData,
  usePatchUserData,
  usePostStopMaternityCash,
} from 'hooks/useUserData/useUserData';
/**
 * @description function to return a UserForm, which will contain fields for all the details of an employee, and conditionally renders fields based on type of the form as either(add or manage user).
 * @version 1.0.0
 * @author [Hariboobaalan]
 * @param { data, showModal, type, onClose }
 * @returns UserForm
 */
const UserForm = ({ employeeId, toast, showModal, type, onClose }) => {
  const {
    USER_DETAILS,
    WORK_DETAILS,
    BUTTONS,
    MATERNITY_CASH,
    REQUIRED,
    TYPES,
    PAYLOAD_STRUCTURE,
    BUSINESS_AND_LOCATIONS,
    STATUS,
  } = AppConstants.USER_FORM;
  /**
   * @description useStates to Handle States of the components
   */
  const [userData, setUserData] = useState({});
  const [selectedGender, setSelectedGender] = useState(USER_DETAILS.SELECT_GENDER);
  const [selectedBusinessUnit, setSelectedBusinessUnit] = useState(WORK_DETAILS.SELECT);
  const [selectedLocation, setSelectedLocation] = useState(WORK_DETAILS.SELECT);
  const [selectedStatus, setSelectedStatus] = useState(WORK_DETAILS.STATUSES[0].value);
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');
  const [businessUnits, setBusinessUnits] = useState([]);
  const [locations, setLocations] = useState([]);
  const [allBusinessUnits, setAllBusinessUnits] = useState([]);
  const [allLocations, setAllLocations] = useState([]);

  {
    /**
     * @description Use Effect for fetching the locations and business units from API call and populate the data to dropdowns
     * @version 1.0.0
     * @author [Hariboobaalan]
     */
  }
  useEffect(() => {
    const getUserData = () => {
      const userData = UserServices.getUserService(employeeId);
      userData
        .then((data) => data.data.data)
        .then((data) => {
          getLocationsAndBusinessUnits();
          setUserData(data);
          setSelectedGender(data[PAYLOAD_STRUCTURE.GENDER]);
          setSelectedBusinessUnit(data[PAYLOAD_STRUCTURE.BUSINESS_UNIT_NAME]);
          setSelectedLocation(data[PAYLOAD_STRUCTURE.LOCATION_NAME]);
          setSelectedStatus(data[PAYLOAD_STRUCTURE.STATUS]);
          if (
            data[PAYLOAD_STRUCTURE.GENDER] === USER_DETAILS.GENDERS[1] &&
            data[PAYLOAD_STRUCTURE.MATERNITY_CASH_STATUS] != undefined &&
            data[PAYLOAD_STRUCTURE.MATERNITY_CASH_STATUS] == 1
          ) {
            setSelectedEndDate(new Date(data[PAYLOAD_STRUCTURE.START_DATE]));
            setSelectedStartDate(new Date(data[PAYLOAD_STRUCTURE.END_DATE]));
          }
        });
    };
    showModal && isAddType && getLocationsAndBusinessUnits();
    showModal && !isAddType && getUserData();
  }, [showModal]);

  {
    /**
     * @description Function to handle the response and display the success or failure message as toast message.
     * @version 1.0.0
     * @author [Hariboobaalan]
     */
  }
  const handleResponse = (data) => {
    data.data
      ? data.data.code >= STATUS.SUCCESS && data.data.code <= STATUS.NOT_SUCCESS
        ? toast.success(data.data.data, { autoClose: true })
        : ''
      : toast.error(data.response.data.data, { autoClose: true });
  };

  {
    /**
     *  @description React Use Query for API calls (Add User, Manage User, Get User By ID, Stop Maternity cash for user)
     * @version 1.0.0
     * @author [Hariboobaalan]
     */
  }
  const { mutate: addUser } = usePostUserData(handleResponse);
  const { mutate: updateUser } = usePatchUserData(handleResponse);
  const { mutate: stopUserMaternityCash } = usePostStopMaternityCash(handleResponse);

  const isAddType = type === TYPES.ADD;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  {
    /**
     * @description Use Effect to GET the Business Unit & Locations data from API and render it.
     * @version 1.0.0
     * @author [Hariboobaalan]
     * @returns null
     */
  }
  const getLocationsAndBusinessUnits = () => {
    const businessesAndLocations = UserServices.getBusinessAndLocations();
    businessesAndLocations
      .then((data) => data.data.data)
      .then((data) => {
        setAllBusinessUnits(data[BUSINESS_AND_LOCATIONS.BUSINESS_UNITS]);
        setAllLocations(data[BUSINESS_AND_LOCATIONS.LOCATIONS]);
        setBusinessUnits(
          data[BUSINESS_AND_LOCATIONS.BUSINESS_UNITS].map(
            (businessUnit) => businessUnit[BUSINESS_AND_LOCATIONS.BUSINESS_UNIT_NAME],
          ),
        );
        setLocations(
          data[BUSINESS_AND_LOCATIONS.LOCATIONS].map(
            (location) => location[BUSINESS_AND_LOCATIONS.LOCATION_NAME],
          ),
        );
      });
  };

  /**
   * @description function to handle the state change of status of user.
   * @version 1.0.0
   * @author [Hariboobaalan]
   * @param { newOption } - The newly selected status of user.
   * @returns null
   */
  const handleStatusChange = (newStatus) => {
    setSelectedStatus(newStatus);
  };

  /**
   * @description function to handle the states of all user form components.
   * @version 1.0.0
   * @author [Hariboobaalan]
   * @returns null
   */
  const resetStates = () => {
    setSelectedGender(USER_DETAILS.SELECT_GENDER);
    setSelectedBusinessUnit(WORK_DETAILS.SELECT);
    setSelectedLocation(WORK_DETAILS.SELECT);
    setSelectedStatus(WORK_DETAILS.STATUSES[0].value);
    setSelectedEndDate(new Date());
    setSelectedStartDate(new Date());
  };

  /**
   * @description function to handle the closing of the overlay modal after resetting the states.
   * @version 1.0.0
   * @author [Hariboobaalan]
   * @returns null
   */
  const handleClose = () => {
    resetStates();
    reset();
    onClose();
  };

  /**
   * @description function to stop the maternity cash and displays a toast message on either success / error.
   * @version 1.0.0
   * @author [Hariboobaalan]
   * @returns null
   */
  const stopMaternityCash = async (event) => {
    event.preventDefault();
    stopUserMaternityCash(userData[PAYLOAD_STRUCTURE.EMP_ID]);
  };
  /**
   * @description function to submit the form data.
   * @version 1.0.0
   * @author [Hariboobaalan]
   * @returns null
   */
  const onSubmit = async (newData) => {
    newData[PAYLOAD_STRUCTURE.GENDER] = selectedGender;
    newData[PAYLOAD_STRUCTURE.BUSINESS_UNIT_ID] = allBusinessUnits.filter(
      (businessUnit) =>
        businessUnit[BUSINESS_AND_LOCATIONS.BUSINESS_UNIT_NAME] == selectedBusinessUnit,
    )[0][BUSINESS_AND_LOCATIONS.BUSINESS_UNIT_ID];
    newData[PAYLOAD_STRUCTURE.LOCATION_ID] = allLocations.filter(
      (location) => location[BUSINESS_AND_LOCATIONS.LOCATION_NAME] == selectedLocation,
    )[0][BUSINESS_AND_LOCATIONS.LOCATION_ID];
    newData.status = selectedStatus;
    !isAddType && (newData[PAYLOAD_STRUCTURE.EMP_ID] = userData[PAYLOAD_STRUCTURE.EMP_ID]);
    if (
      !(
        selectedGender === USER_DETAILS.GENDERS[1] &&
        newData[PAYLOAD_STRUCTURE.MATERNITY_CASH_STATUS] === 1
      )
    ) {
      delete newData[PAYLOAD_STRUCTURE.START_DATE];
      delete newData[PAYLOAD_STRUCTURE.END_DATE];
    }
    isAddType ? addUser(newData) : updateUser([userData[PAYLOAD_STRUCTURE.EMP_ID], newData]);
    handleClose();
  };
  return (
    <>
      {showModal && (
        <>
          <OverlayModal onClose={handleClose} title={type}>
            <div className={style['userform']}>
              <div className={style['main-section']}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className={style['user-form-section']}>
                    <div className={style['user-details']}>
                      <LabeledInput
                        type='text'
                        labelColor={'black'}
                        value={isAddType ? null : userData[PAYLOAD_STRUCTURE.WORKER_NAME]}
                        name={USER_DETAILS.WORKER_NAME}
                        register={register(PAYLOAD_STRUCTURE.WORKER_NAME, {
                          required: `${USER_DETAILS.WORKER_NAME} ${REQUIRED}`,
                        })}
                        errors={errors}
                      />
                      <LabeledInput
                        type='number'
                        value={isAddType ? null : userData[PAYLOAD_STRUCTURE.EMP_ID]}
                        labelColor={'black'}
                        disabled={isAddType ? false : true}
                        name={USER_DETAILS.EMP_ID}
                        register={register(PAYLOAD_STRUCTURE.EMP_ID)}
                        errors={errors}
                      />
                      <div className={style['dropdown']}>
                        <Label name={USER_DETAILS.GENDER} color={'black'} />
                        <Dropdown
                          options={USER_DETAILS.GENDERS}
                          selected={selectedGender}
                          setSelected={setSelectedGender}
                        />
                      </div>
                      <LabeledInput
                        type='text'
                        labelColor={'black'}
                        value={isAddType ? null : userData[PAYLOAD_STRUCTURE.EMAIL]}
                        name={USER_DETAILS.EMAIL}
                        register={register(PAYLOAD_STRUCTURE.EMAIL, {
                          required: `${USER_DETAILS.EMAIL} ${REQUIRED}`,
                        })}
                        errors={errors}
                      />
                      <LabeledInput
                        type='number'
                        labelColor={'black'}
                        value={isAddType ? null : userData[PAYLOAD_STRUCTURE.CONTACT]}
                        name={USER_DETAILS.CONTACT}
                        register={register(PAYLOAD_STRUCTURE.CONTACT, {
                          required: `${USER_DETAILS.CONTACT} ${REQUIRED}`,
                        })}
                        errors={errors}
                      />
                    </div>
                    <div className={style['work-details']}>
                      <div className={style['dropdown']}>
                        <Label name={WORK_DETAILS.BUSINESS_UNIT} color={'black'} />
                        <Dropdown
                          options={businessUnits}
                          selected={selectedBusinessUnit}
                          setSelected={setSelectedBusinessUnit}
                        />
                      </div>
                      <div className={style['dropdown']}>
                        <Label name={WORK_DETAILS.LOCATION} color={'black'} />
                        <Dropdown
                          options={locations}
                          selected={selectedLocation}
                          setSelected={setSelectedLocation}
                        />
                      </div>
                      <RadioGroup
                        labelName={WORK_DETAILS.STATUS}
                        register={register(PAYLOAD_STRUCTURE.STATUS)}
                        options={WORK_DETAILS.STATUSES}
                        selectedOption={selectedStatus}
                        onChange={handleStatusChange}
                        infoText={WORK_DETAILS.INFO}
                      />
                    </div>
                  </div>
                  {!isAddType && (
                    <div className={style['cash-detail-section']}>
                      <h3 className={style['cash-heading']}>{MATERNITY_CASH.LABEL}</h3>

                      {selectedGender === USER_DETAILS.GENDERS[0] ? (
                        <p className={style['cash-content']}>{MATERNITY_CASH.NOT_APPLICABLE}</p>
                      ) : selectedGender === USER_DETAILS.GENDERS[1] &&
                        userData[PAYLOAD_STRUCTURE.MATERNITY_CASH_STATUS] === 0 ? (
                        <p className={style['cash-content']}>{MATERNITY_CASH.ADD_CASH}</p>
                      ) : (
                        <>
                          <div className={style['date-container']}>
                            <DatePickerButton
                              labelText={MATERNITY_CASH.START_DT}
                              initialDate={selectedStartDate}
                              onChange={setSelectedStartDate}
                              showTime={true}
                              disabled={true}
                              register={register(PAYLOAD_STRUCTURE.START_DATE)}
                            />
                            <DatePickerButton
                              labelText={MATERNITY_CASH.END_DT}
                              initialDate={selectedEndDate}
                              onChange={setSelectedEndDate}
                              showTime={true}
                              disabled={true}
                              register={register(PAYLOAD_STRUCTURE.END_DATE)}
                            />
                          </div>
                          <Button
                            label={BUTTONS.STOP_MATERNITY_CASH}
                            color={'primary'}
                            size={'xl'}
                            click={stopMaternityCash}
                          />
                        </>
                      )}
                    </div>
                  )}
                  <Button
                    label={TYPES.ADD === type ? BUTTONS.ADD : BUTTONS.SAVE}
                    color={'primary'}
                    size={'xxxl'}
                  />
                </form>
              </div>
            </div>
          </OverlayModal>
        </>
      )}
    </>
  );
};
UserForm.propTypes = {
  employeeId: PropTypes.number,
  showModal: PropTypes.bool,
  type: PropTypes.string,
  onClose: PropTypes.func,
  toast: PropTypes.func,
};
export default UserForm;
