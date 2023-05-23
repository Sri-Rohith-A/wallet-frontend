import { useEffect, useState } from 'react';
import style from './UserForm.module.scss';
import LabeledInput from 'components/LabeledInput/LabeledInput';
import { useForm } from 'react-hook-form';
import { AppConstants, TEXT, NUMBER, EMAIL, TEL } from 'constants/app-constants';
import RadioGroup from 'components/form-inputs/RadioGroup/RadioGroup';
import PropTypes from 'prop-types';
import Button from 'components/Button/Button';
import Dropdown from 'components/Dropdown/Dropdown';
import { Label } from 'components/form-inputs/label/Label';
import DatePickerButton from 'components/DatePickerButton/DatePickerButton';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { StringHelper } from 'utils/stringHelper';
import ConfirmationBox from 'components/ConfirmationBox/ConfirmationBox';
import {
  usePostUserData,
  usePatchUserData,
  usePostStopMaternityCash,
  useLocationAndBusinessData,
  useUserData,
} from 'hooks/useUserData/useUserData';
import { ConfirmationMessage } from 'constants/Messages/confirmation-message';
/**
 * @description function to return a UserForm, which will contain fields for all the details of an employee, and conditionally renders fields based on type of the form as either(add or manage user).
 * @version 1.0.0
 * @author [Hariboobaalan]
 * @param { employeeId, showModal, toast, onClose, type }
 * @returns UserForm
 */
const UserForm = ({ employeeId, showModal, toast, onClose, type, usersRefetch }) => {
  const {
    USER_DETAILS,
    ERROR_MESSAGE,
    WORK_DETAILS,
    BUTTONS,
    MATERNITY_CASH,
    TYPES,
    PAYLOAD_STRUCTURE,
    PAYLOAD_DATA,
    BUSINESS_AND_LOCATIONS,
    STATUS,
  } = AppConstants.USER_FORM;
  const { BUTTON } = AppConstants;
  /**
   * @description useStates to Handle States of the components
   */
  const [userData, setUserData] = useState(PAYLOAD_DATA);
  const [businessUnits, setBusinessUnits] = useState([]);
  const [isStopped, setIsStopped] = useState(false);
  const [locations, setLocations] = useState([]);
  const [allBusinessUnits, setAllBusinessUnits] = useState([]);
  const [allLocations, setAllLocations] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [buttonToggle, setButtonToggle] = useState(true);
  const [confirmBox, setConfirmBox] = useState(false);
  const [formData, setFormData] = useState({});
  const isAddType = type === TYPES.ADD;

  //get user by employee id query
  const {
    data: fetchedUserData,
    isSuccess: isGetUserSuccess,
    refetch: userRefetch,
  } = useUserData(employeeId);

  //get locations and business units
  const { data: locationsAndBusinessUnits, isSuccess: isGetLocationBUSuccess } =
    useLocationAndBusinessData();

  const handleButtonToggle = () => {
    setButtonToggle(false);
  };
  const handleSelectGender = (gender) => {
    userData[PAYLOAD_STRUCTURE.GENDER] = gender;
    handleButtonToggle();
    setUserData({ ...userData });
  };
  const handleSelectBusinessUnit = (businessUnitName) => {
    userData[PAYLOAD_STRUCTURE.BUSINESS_UNIT_NAME] = businessUnitName;
    handleButtonToggle();
    setUserData({ ...userData });
  };
  const handleSelectLocation = (locationName) => {
    userData[PAYLOAD_STRUCTURE.LOCATION_NAME] = locationName;
    handleButtonToggle();
    setUserData({ ...userData });
  };
  const handleSelectStatus = (status) => {
    userData[PAYLOAD_STRUCTURE.STATUS] = status;
    handleButtonToggle();
    setUserData({ ...userData });
  };
  const handleSelectStartDate = (startDate) => {
    userData[PAYLOAD_STRUCTURE.START_DATE] = startDate;
    setUserData({ ...userData });
  };
  const handleSelectEndDate = (endDate) => {
    userData[PAYLOAD_STRUCTURE.END_DATE] = endDate;
    setUserData({ ...userData });
  };

  const businessUnitNameToID = () => {
    return allBusinessUnits.filter(
      (businessUnit) =>
        businessUnit[BUSINESS_AND_LOCATIONS.BUSINESS_UNIT_NAME] ==
        userData[PAYLOAD_STRUCTURE.BUSINESS_UNIT_NAME],
    )[0][BUSINESS_AND_LOCATIONS.BUSINESS_UNIT_ID];
  };
  const locationNameToID = () => {
    return allLocations.filter(
      (location) =>
        location[BUSINESS_AND_LOCATIONS.LOCATION_NAME] == userData[PAYLOAD_STRUCTURE.LOCATION_NAME],
    )[0][BUSINESS_AND_LOCATIONS.LOCATION_ID];
  };
  const setFormDefaultValues = (data) => {
    setValue(PAYLOAD_STRUCTURE.EMP_ID, data.employeeId);
    setValue(
      PAYLOAD_STRUCTURE.WORKER_NAME,
      StringHelper.capitalizeFirstLettersInText(data.employeeName),
    );
    setValue(PAYLOAD_STRUCTURE.EMAIL, data.employeeEmail);
    setValue(PAYLOAD_STRUCTURE.CONTACT, data.contactNumber);
  };
  {
    /**
     * @description Use Effect for fetching the locations and business units from API call and populate the data to dropdowns
     * @version 1.0.0
     * @author [Hariboobaalan]
     */
  }
  useEffect(() => {
    isGetLocationBUSuccess && getLocationsAndBusinessUnits();
    userRefetch();
  }, [isAddType, showModal, isGetLocationBUSuccess, isGetUserSuccess]);

  useEffect(() => {
    if (!isAddType && fetchedUserData?.data?.data) {
      setUserData(fetchedUserData.data.data);
      setButtonToggle(true);
      setFormDefaultValues(fetchedUserData.data.data);
    } else {
      resetStates();
      reset();
      setUserData(PAYLOAD_DATA);
    }
  }, [fetchedUserData]);

  {
    /**
     * @description Function to handle the response and display the success or failure message as toast message.
     * @version 1.0.0
     * @author [Hariboobaalan]
     */
  }
  const handleResponse = (data) => {
    usersRefetch();
    data.status
      ? data.status >= STATUS.SUCCESS && data.status <= STATUS.NOT_SUCCESS
        ? toast.success(data.data.data)
        : toast.error(data.response.data.data)
      : toast.error(data.response.data.data);
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

  const {
    register,
    setValue,
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
    const data = locationsAndBusinessUnits.data.data;
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
  };

  /**
   * @description function to handle the states of all user form components.
   * @version 1.0.0
   * @author [Hariboobaalan]
   * @returns null
   */
  const resetStates = () => {
    handleSelectGender(WORK_DETAILS.SELECT);
    handleSelectBusinessUnit(WORK_DETAILS.SELECT);
    handleSelectLocation(WORK_DETAILS.SELECT);
    handleSelectStatus(WORK_DETAILS.STATUSES[0].value);
    handleSelectStartDate(new Date());
    handleSelectEndDate(new Date());
    setUserData({});
    setIsActive(false);
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
    setIsStopped(true);
    stopUserMaternityCash(userData[PAYLOAD_STRUCTURE.EMP_ID]);
  };

  const handleConfirmation = () => {
    delete formData[PAYLOAD_STRUCTURE.STATUS];
    const newData = { ...userData, ...formData };
    newData[PAYLOAD_STRUCTURE.BUSINESS_UNIT_ID] = businessUnitNameToID();
    newData[PAYLOAD_STRUCTURE.LOCATION_ID] = locationNameToID();
    {
      delete newData[PAYLOAD_STRUCTURE.BUSINESS_UNIT_NAME];
      delete newData[PAYLOAD_STRUCTURE.LOCATION_NAME];
      delete newData[PAYLOAD_STRUCTURE.START_DATE];
      delete newData[PAYLOAD_STRUCTURE.END_DATE];
      delete newData[PAYLOAD_STRUCTURE.MATERNITY_CASH_STATUS];
    }
    setUserData(newData);
    isAddType ? addUser(newData) : updateUser([newData[PAYLOAD_STRUCTURE.EMP_ID], newData]);
    handleClose();
  };
  const closeConfirmation = () => {
    setConfirmBox(false);
  };
  /**
   * @description function to submit the form data.
   * @version 1.0.0
   * @author [Hariboobaalan]
   * @returns null
   */
  const onSubmit = async (formData) => {
    setFormData(formData);
    setConfirmBox(true);
  };
  return (
    <>
      <div className={style['userform']}>
        <div className={style['main-section']}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className={style['user-form-section']}>
              <div className={style['user-details']}>
                <LabeledInput
                  type={TEXT}
                  labelColor={AppConstants.COLOR.BLACK}
                  labelText={USER_DETAILS.WORKER_NAME}
                  defaultValue={
                    isAddType
                      ? null
                      : StringHelper.capitalizeFirstLettersInText(
                          userData[PAYLOAD_STRUCTURE.WORKER_NAME],
                        )
                  }
                  name={PAYLOAD_STRUCTURE.WORKER_NAME}
                  register={register(PAYLOAD_STRUCTURE.WORKER_NAME, {
                    required: `${ERROR_MESSAGE.WORKER_NAME}`,
                  })}
                  errors={errors}
                  {...(!isAddType && { change: handleButtonToggle })}
                />

                <LabeledInput
                  type={NUMBER}
                  defaultValue={isAddType ? null : userData[PAYLOAD_STRUCTURE.EMP_ID]}
                  labelColor={AppConstants.COLOR.BLACK}
                  disabled={!isAddType}
                  labelText={USER_DETAILS.EMP_ID}
                  name={PAYLOAD_STRUCTURE.EMP_ID}
                  register={register(PAYLOAD_STRUCTURE.EMP_ID, {
                    required: `${ERROR_MESSAGE.EMP_ID}`,
                  })}
                  errors={errors}
                  {...(!isAddType && { change: handleButtonToggle })}
                />
                <div className={style['dropdown']}>
                  <Label name={USER_DETAILS.GENDER} color={AppConstants.COLOR.BLACK} />
                  <Dropdown
                    options={USER_DETAILS.GENDERS}
                    selected={userData[PAYLOAD_STRUCTURE.GENDER]}
                    setSelected={handleSelectGender}
                  />
                  {userData[PAYLOAD_STRUCTURE.GENDER] === WORK_DETAILS.SELECT && isActive && (
                    <ErrorMessage errors={ERROR_MESSAGE.GENDER} />
                  )}
                </div>
                <LabeledInput
                  type={EMAIL}
                  labelColor={AppConstants.COLOR.BLACK}
                  labelText={USER_DETAILS.EMAIL}
                  defaultValue={isAddType ? null : userData[PAYLOAD_STRUCTURE.EMAIL]}
                  name={PAYLOAD_STRUCTURE.EMAIL}
                  register={register(PAYLOAD_STRUCTURE.EMAIL, {
                    required: `${ERROR_MESSAGE.EMAIL.REQUIRED}`,
                    pattern: {
                      value: /^\S+@cdw\S+$/i,
                      message: `${ERROR_MESSAGE.EMAIL.PATTERN}`,
                    },
                  })}
                  errors={errors}
                  {...(!isAddType && { change: handleButtonToggle })}
                />
                <LabeledInput
                  type={TEL}
                  labelColor={AppConstants.COLOR.BLACK}
                  labelText={USER_DETAILS.CONTACT}
                  defaultValue={isAddType ? null : userData[PAYLOAD_STRUCTURE.CONTACT]}
                  name={PAYLOAD_STRUCTURE.CONTACT}
                  register={register(PAYLOAD_STRUCTURE.CONTACT, {
                    required: `${ERROR_MESSAGE.CONTACT.REQUIRED}`,
                    pattern: {
                      value: /^[6789]\d{9}$/,
                      message: `${ERROR_MESSAGE.CONTACT.PATTERN}`,
                    },
                  })}
                  errors={errors}
                  {...(!isAddType && { change: handleButtonToggle })}
                />
              </div>
              <div className={style['work-details']}>
                <div className={style['dropdown']}>
                  <Label name={WORK_DETAILS.BUSINESS_UNIT} color={AppConstants.COLOR.BLACK} />
                  <Dropdown
                    options={businessUnits}
                    selected={userData[PAYLOAD_STRUCTURE.BUSINESS_UNIT_NAME]}
                    setSelected={handleSelectBusinessUnit}
                  />
                  {userData[PAYLOAD_STRUCTURE.BUSINESS_UNIT_NAME] === WORK_DETAILS.SELECT &&
                    isActive && <ErrorMessage errors={ERROR_MESSAGE.BUSINESS_UNIT} />}
                </div>
                <div className={style['dropdown']}>
                  <Label name={WORK_DETAILS.LOCATION} color={AppConstants.COLOR.BLACK} />
                  <Dropdown
                    options={locations}
                    selected={userData[PAYLOAD_STRUCTURE.LOCATION_NAME]}
                    setSelected={handleSelectLocation}
                  />
                  {userData[PAYLOAD_STRUCTURE.LOCATION_NAME] === WORK_DETAILS.SELECT &&
                    isActive && <ErrorMessage errors={ERROR_MESSAGE.LOCATION} />}
                </div>
                <RadioGroup
                  labelName={WORK_DETAILS.STATUS}
                  register={register(PAYLOAD_STRUCTURE.STATUS)}
                  options={WORK_DETAILS.STATUSES}
                  selectedOption={userData[PAYLOAD_STRUCTURE.STATUS]}
                  onChange={handleSelectStatus}
                  infoText={WORK_DETAILS.INFO}
                />
              </div>
            </div>
            {!isAddType && userData[PAYLOAD_STRUCTURE.GENDER] !== USER_DETAILS.GENDERS[2] && (
              <div className={style['cash-detail-section']}>
                <h3 className={style['cash-heading']}>{MATERNITY_CASH.LABEL}</h3>
                {userData[PAYLOAD_STRUCTURE.GENDER] === USER_DETAILS.GENDERS[0] ? (
                  <p className={style['cash-content']}>{MATERNITY_CASH.NOT_APPLICABLE}</p>
                ) : userData[PAYLOAD_STRUCTURE.GENDER] === USER_DETAILS.GENDERS[1] ? (
                  userData[PAYLOAD_STRUCTURE.MATERNITY_CASH_STATUS] !== 1 ? (
                    <p className={style['cash-content']}>{MATERNITY_CASH.ADD_CASH}</p>
                  ) : isStopped ? (
                    <p className={style['cash-content']}>{MATERNITY_CASH.STOP_CASH}</p>
                  ) : (
                    <>
                      <div className={style['date-container']}>
                        <DatePickerButton
                          labelText={MATERNITY_CASH.START_DT}
                          initialDate={new Date(userData[PAYLOAD_STRUCTURE.START_DATE])}
                          onChange={handleSelectStartDate}
                          showTime={true}
                          disabled={true}
                          register={register(PAYLOAD_STRUCTURE.START_DATE)}
                        />
                        <DatePickerButton
                          labelText={MATERNITY_CASH.END_DT}
                          initialDate={new Date(userData[PAYLOAD_STRUCTURE.END_DATE])}
                          onChange={handleSelectEndDate}
                          showTime={true}
                          disabled={true}
                          register={register(PAYLOAD_STRUCTURE.END_DATE)}
                        />
                      </div>
                      <Button
                        label={BUTTONS.STOP_MATERNITY_CASH}
                        color={BUTTON.COLOR.PRIMARY}
                        size={BUTTON.SIZE.XL}
                        click={stopMaternityCash}
                      />
                    </>
                  )
                ) : (
                  ''
                )}
              </div>
            )}
            <Button
              label={TYPES.ADD === type ? BUTTONS.ADD : BUTTONS.SAVE}
              color={buttonToggle ? BUTTON.COLOR.DISABLE : BUTTON.COLOR.PRIMARY}
              size={BUTTON.SIZE.XXXL}
              click={() => setIsActive(true)}
              disable={buttonToggle}
            />
          </form>
          {confirmBox && (
            <ConfirmationBox
              title={
                isAddType
                  ? ConfirmationMessage.USER_PAGE.ADD_USER.TITLE
                  : ConfirmationMessage.USER_PAGE.MODIFY_USER.TITLE
              }
              desc={
                isAddType
                  ? ConfirmationMessage.USER_PAGE.ADD_USER.DESC
                  : ConfirmationMessage.USER_PAGE.MODIFY_USER.DESC
              }
              close={closeConfirmation}
              click={handleConfirmation}
            />
          )}
        </div>
      </div>
    </>
  );
};
UserForm.propTypes = {
  employeeId: PropTypes.number,
  type: PropTypes.string,
  onClose: PropTypes.func,
  toast: PropTypes.func,
  usersRefetch: PropTypes.func,
  showModal: PropTypes.bool,
};
export default UserForm;
