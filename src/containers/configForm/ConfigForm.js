import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import style from './ConfigForm.module.scss';
import CashDetails from 'containers/cashDetails/CashDetails';
import Button from 'components/Button/Button';
import { AppConstants } from 'constants/app-constants';
import { configGetService, configPatchService } from 'services/configService';
import { StringHelper } from 'utils/stringHelper';
import { useConfigsData, useConfigsPatch } from 'hooks/useConfigsData/useConfigsData';

/**
 * @description this function will render the config form container
 * @version 1.0.0
 * @author [Sai Kishore]
 */

const ConfigForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //toast message handler
  const handleConfigsSave = (data) => {
    if (data.status == 200) {
      toast.success(data.data.data, { autoClose: false });
    } else {
      toast.error(data.data.data, { autoClose: false });
    }
  };

  // getting configs data from useConfigsData hook
  const { data: configsData, isLoading } = useConfigsData();

  //upadting configs form with useConfigsPatch hook
  const { mutate: updateConfigs } = useConfigsPatch(handleConfigsSave);

  if (isLoading) {
    return <h1>Loading..</h1>;
  }

  //setting the data
  const data = configsData?.data?.data;

  const onSubmit = (data) => {
    const result = [];
    for (const key in data) {
      const [location, cashType, defaultCarryOverDays] = key.split('-');
      const value = data[key];
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
    updateConfigs(result);
  };

  return (
    <>
      <form className={style['cash-modal']} onSubmit={handleSubmit(onSubmit)}>
        <CashDetails
          data={data}
          filter={AppConstants.CONFIG.CDW_CASH}
          register={register}
          errors={errors}
        />

        <CashDetails
          data={data}
          filter={AppConstants.CONFIG.MATERNITY_CASH}
          register={register}
          errors={errors}
        />
        <Button
          color={AppConstants.BUTTON.BUTTON_COLOR_PRIMARY}
          size={AppConstants.BUTTON.BUTTON_SIZE_XXL}
          border={AppConstants.BUTTON.BUTTON_SHAPE_SOLID}
          label={AppConstants.CONFIG.BUTTON_LABEL}
        />
      </form>
      <ToastContainer />
    </>
  );
};

export default ConfigForm;
