import Input from '../../components/form-inputs/input/Input';
import style from './CashDetails.module.scss';
import { StringHelper } from '../../utils/stringHelper';
import { PropTypes } from 'prop-types';
import { AppConstants } from '../../constants/app-constants';

/**
 * @description this function will render the cash details based on the api response
 * @version 1.0.0
 * @author [Sai Kishore]
 */

const CashDetails = ({ filter, data, register, errors }) => {
  const cashType = data.filter((item) => item.cashType === filter);
  return (
    <>
      <div className={style['cash-form']}>
        <p className={style['cash-heading']}>
          {filter === AppConstants.CONFIG.CDW_CASH
            ? StringHelper.capitalize(AppConstants.CONFIG.CDW_CASH)
            : StringHelper.capitalizeFirstLetter(AppConstants.CONFIG.MATERNITY_CASH)}{' '}
          Cash
        </p>

        <p className={style['cash-desc']}>
          {filter === AppConstants.CONFIG.CDW_CASH
            ? AppConstants.CONFIG.CDW_DESC
            : AppConstants.CONFIG.MATERNITY_DESC}{' '}
        </p>
        <div className={style['label']}>
          <p className={style['cash-title']}>
            {filter === AppConstants.CONFIG.CDW_CASH
              ? StringHelper.capitalize(AppConstants.CONFIG.CDW_CASH)
              : StringHelper.capitalizeFirstLetter(AppConstants.CONFIG.MATERNITY_CASH)}{' '}
            Cash
          </p>
          {filter === AppConstants.CONFIG.CDW_CASH ? (
            <p className={style['carry-over-label']}>{AppConstants.CONFIG.CARRY_OVER_DAYS}</p>
          ) : (
            <></>
          )}
        </div>
        {cashType.map((element) => (
          <>
            <div className={style['row']}>
              <p className={style['cash-location']}>
                {StringHelper.capitalizeFirstLetter(element.locationName)}
              </p>
              <div className={style['input']}>
                <Input
                  type={'number'}
                  name={`${element.locationId}-${element.cashTypeId}`}
                  register={register(`${element.locationId}-${element.cashTypeId}`)}
                  errors={errors}
                  value={element.defaultAmount}
                />
              </div>
              {element.cashType !== AppConstants.CONFIG.MATERNITY_CASH && (
                <div className={style['input']}>
                  <Input
                    type={'number'}
                    name={`${element.locationId}-${element.cashTypeId}-carryOverDays`}
                    register={register(`${element.locationId}-${element.cashTypeId}-carryOverDays`)}
                    errors={errors}
                    value={element.carryOverDays}
                  />
                </div>
              )}
            </div>
          </>
        ))}
      </div>
    </>
  );
};

CashDetails.propTypes = {
  filter: PropTypes.string,
  data: PropTypes.array,
  register: PropTypes.func,
  errors: PropTypes.object,
};
export default CashDetails;
