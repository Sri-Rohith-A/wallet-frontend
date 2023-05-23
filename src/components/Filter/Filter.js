import styles from './Filter.module.scss';
import PropTypes from 'prop-types';
import { Label } from 'components/form-inputs/label/Label';
import { StringHelper } from 'utils/stringHelper';
import { FILTER_COMPONENT } from 'constants/app-constants';

/**
 * @description function to return a Filter component
 * @version 1.0.0
 * @author [Abdul Adhil]
 * @param {type,value}
 * @returns Filter
 */

const Filter = ({ type, name, value, register }) => {
  return (
    <>
      <div className={styles['filter']}>
        <input
          id={StringHelper.toSnakeCase(value)}
          type={type}
          name={name}
          value={value}
          {...register}
          data-testid={FILTER_COMPONENT}
        />
        <Label name={value} />
      </div>
    </>
  );
};
export default Filter;
Filter.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  register: PropTypes.object,
};
