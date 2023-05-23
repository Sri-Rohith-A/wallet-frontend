import { AppConstants } from 'constants/app-constants';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import styles from './ReportsFilters.module.scss';
import Button from 'components/Button/Button';
import FilterType from 'containers/FilterType/FilterType';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { StringHelper } from 'utils/stringHelper';
import { StandardReports, CustomReports } from '../../constants/reports-schema-constants';
import { useState, useEffect } from 'react';

/**
 * @description this function is to render the Reports page
 * @version 1.0.0
 * @author [Abdul Adhil]
 */

const ReportsFilters = ({ data, submit }) => {
  const [isStandardButtonDisabled, setStandardIsButtonDisabled] = useState(true);
  const [isCustomButtonDisabled, setCustomIsButtonDisabled] = useState(true);
  const { register, handleSubmit, watch } = useForm({ mode: 'onChange' });
  const filterObject = data ? data : '';
  const standardFields = [];
  const customFields = [];

  Object.keys(StandardReports).map((key) => {
    standardFields.push(StringHelper.toKebabCase(StandardReports[key].label));
    !StandardReports[key].data.length
      ? (StandardReports[key].data = filterObject ? filterObject[key] : [])
      : StandardReports[key].data;
  });
  Object.keys(CustomReports).map((key) => {
    customFields.push(StringHelper.toKebabCase(CustomReports[key].label));
    !CustomReports[key].data.length && filterObject[key]
      ? (CustomReports[key].data = filterObject ? filterObject[key] : [])
      : CustomReports[key].data;
  });

  //button state for standard report
  useEffect(() => {
    const watchFields = watch(standardFields);
    if (watchFields.every((field) => field)) {
      setStandardIsButtonDisabled(false);
    } else {
      setStandardIsButtonDisabled(true);
    }
  }, [watch, standardFields]);
  //button state for custom report

  useEffect(() => {
    const watchFields = watch(customFields);
    if (watchFields.every((field) => field)) {
      setCustomIsButtonDisabled(false);
    } else {
      setCustomIsButtonDisabled(true);
    }
  }, [watch, customFields]);

  //
  // standard report
  const standard = Object.entries(StandardReports).map(([key, value]) => ({ ...value, id: key }));
  //custom report
  const custom = Object.entries(CustomReports).map(([key, value]) => ({ ...value, id: key }));

  const { REPORTS_TYPE, BUTTON_LABEL } = AppConstants.REPORTS_PAGE;

  return (
    <>
      <Tabs className={styles['filters']} selectedTabClassName={styles['active-tab']}>
        <TabList>
          <Tab>{REPORTS_TYPE.STANDARD_REPORTS}</Tab>
          <Tab>{REPORTS_TYPE.CUSTOM_REPORTS}</Tab>
        </TabList>

        <TabPanel>
          <form onSubmit={handleSubmit(submit)}>
            {standard.map((el, index) => {
              return (
                <FilterType
                  key={index}
                  register={register(StringHelper.toKebabCase(el.label))}
                  data={el.data}
                  label={el.label}
                  type={el.type}
                />
              );
            })}

            <Button
              label={BUTTON_LABEL}
              color={
                isStandardButtonDisabled
                  ? AppConstants.BUTTON.COLOR.DISABLE
                  : AppConstants.BUTTON.COLOR.PRIMARY
              }
              size={AppConstants.BUTTON.SIZE.XXL}
              disable={isStandardButtonDisabled}
            />
          </form>
        </TabPanel>
        <TabPanel>
          <form onSubmit={handleSubmit(submit)}>
            {custom.map((el, index) => {
              return (
                <FilterType
                  key={index}
                  register={register(StringHelper.toKebabCase(el.label))}
                  data={el.data}
                  label={el.label}
                  type={el.type}
                />
              );
            })}
            <Button
              label={BUTTON_LABEL}
              color={
                isCustomButtonDisabled
                  ? AppConstants.BUTTON.COLOR.DISABLE
                  : AppConstants.BUTTON.COLOR.PRIMARY
              }
              size={AppConstants.BUTTON.SIZE.XXL}
              disable={isCustomButtonDisabled}
            />
          </form>
        </TabPanel>
      </Tabs>
    </>
  );
};
export default ReportsFilters;
ReportsFilters.propTypes = {
  data: PropTypes.object,
};
