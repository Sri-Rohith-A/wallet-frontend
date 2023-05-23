import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import style from './ConfigForm.module.scss';
import CashDetails from 'containers/cashDetails/CashDetails';
import Button from 'components/Button/Button';
import { AppConstants, SUCCESS_CODE } from 'constants/app-constants';
import { useConfigsData, useConfigsPatch } from 'hooks/useConfigsData/useConfigsData';
import ConfirmationBox from 'components/ConfirmationBox/ConfirmationBox';

/**
 * @description this function will render the config form container
 * @version 1.0.0
 * @author [Sai Kishore]
 */

const ConfigForm = () => {
  const [FormData, setFormData] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    onChange,
  } = useForm();

  //toast message handler
  const handleConfigsSave = (data) => {
    if (data.status == SUCCESS_CODE) {
      toast.success(data.data.data);
    } else {
      toast.error(data.data.data);
    }
  };

  const [buttonToggle, setToggle] = useState(true);

  // getting configs data from useConfigsData hook
  const { data: configsData, isLoading, refetch } = useConfigsData();
  const [show, setShow] = useState(false);

  useEffect(() => {
    refetch();
  }, [configsData]);
  //upadting configs form with useConfigsPatch hook
  const { mutate: updateConfigs } = useConfigsPatch(handleConfigsSave);

  if (isLoading) {
    return <h1>Loading..</h1>;
  }
  const handleClose = () => {
    setShow(false);
  };
  const handleChange = () => {
    setToggle(false);
  };

  //setting the data
  const data = configsData?.data?.data;

  const onSubmit = (data, event) => {
    setFormData(data);
    setShow(true);
  };
  const handleConformation = () => {
    const result = [];
    for (const key in FormData) {
      const [location, cashType, defaultCarryOverDays] = key.split('-');
      const value = FormData[key];
      const entry = result.find(
        (item) => item.locationId === location && item.cashTypeId === cashType,
      );
      if (entry) {
        entry.defaultCarryOverDays = value;
      } else {
        result.push({
          locationId: location,
          cashTypeId: cashType,
          defaultAmount: value,
        });
      }
    }
    setToggle(true);
    updateConfigs(result);
    setFormData(null);
    setShow(false);
  };

  return (
    <>
      <form className={style['cash-modal']} onSubmit={handleSubmit(onSubmit)}>
        <CashDetails
          data={data}
          filter={AppConstants.CONFIG.CDW_CASH}
          register={register}
          errors={errors}
          change={handleChange}
        />

        <CashDetails
          data={data}
          filter={AppConstants.CONFIG.MATERNITY_CASH}
          register={register}
          errors={errors}
          change={handleChange}
        />
        <Button
          color={
            buttonToggle ? AppConstants.BUTTON.COLOR.DISABLE : AppConstants.BUTTON.COLOR.PRIMARY
          }
          size={AppConstants.BUTTON.SIZE.XXL}
          border={AppConstants.BUTTON.SHAPE.SOLID}
          label={AppConstants.CONFIG.BUTTON_LABEL}
          disable={buttonToggle}
        />
      </form>
      <ToastContainer />
      {show && (
        <ConfirmationBox
          title={AppConstants.CONFIG.CONFIRMATION_BOX.TITLE}
          desc={AppConstants.CONFIG.CONFIRMATION_BOX.DESC}
          close={handleClose}
          click={handleConformation}
        />
      )}
    </>
  );
};

export default ConfigForm;
