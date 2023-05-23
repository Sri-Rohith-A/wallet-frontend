import Input from '../../components/form-inputs/input/Input';
import style from './CashDetails.module.scss';
import { StringHelper } from '../../utils/stringHelper';
import { PropTypes } from 'prop-types';
import { AppConstants, NUMBER, CARRY_OVER_DAYS } from '../../constants/app-constants';
import { ErrorConstants } from 'constants/error-constants';
/**
 * @description this function will render the cash details based on the api response
 * @version 1.0.0
 * @author [Sai Kishore]
 */

const CashDetails = ({ filter, data, register, errors, change }) => {
  const cashType = data?.filter((item) => item.cashType === filter);
  let cash =
    filter === AppConstants.CONFIG.CDW_CASH
      ? StringHelper.capitalize(AppConstants.CONFIG.CDW_CASH)
      : StringHelper.capitalizeFirstLetter(AppConstants.CONFIG.MATERNITY_CASH);
  return (
    <>
      <div className={style['cash-form']}>
        <p className={style['cash-heading']}>{cash} Cash</p>

        <p className={style['cash-desc']}>
          {filter === AppConstants.CONFIG.CDW_CASH
            ? AppConstants.CONFIG.CDW_DESC
            : AppConstants.CONFIG.MATERNITY_DESC}{' '}
        </p>
        <div className={style['label']}>
          <p className={style['cash-title']}>{cash} Cash</p>
          {filter === AppConstants.CONFIG.CDW_CASH ? (
            <p className={style['carry-over-label']}>{AppConstants.CONFIG.CARRY_OVER_DAYS}</p>
          ) : (
            <></>
          )}
        </div>
        {cashType?.map((element, index) => (
          <div className={style['row']} key={index}>
            <p className={style['cash-location']}>
              {StringHelper.capitalizeFirstLetter(element.locationName)}
            </p>
            <div className={style['input']}>
              <Input
                type={NUMBER}
                name={`${element.locationId}-${element.cashTypeId}`}
                register={register(`${element.locationId}-${element.cashTypeId}`, {
                  required: `${element.locationName}'s ${cash} ${ErrorConstants.CONFIG.CASH_REQUIRED}`,
                })}
                errors={errors}
                defaultValue={element.defaultAmount}
                change={change}
              />
            </div>
            {element.cashType !== AppConstants.CONFIG.MATERNITY_CASH && (
              <div className={style['input']}>
                <Input
                  type={NUMBER}
                  name={`${element.locationId}-${element.cashTypeId}-${CARRY_OVER_DAYS}`}
                  register={register(
                    `${element.locationId}-${element.cashTypeId}-${CARRY_OVER_DAYS}`,
                    {
                      required: `${element.locationName}'s ${ErrorConstants.CONFIG.CARRY_OVER_DAYS_REQUIRED}`,
                    },
                  )}
                  errors={errors}
                  defaultValue={element.carryOverDays}
                  change={change}
                />
              </div>
            )}
          </div>
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
  change: PropTypes.func,
};
export default CashDetails;
