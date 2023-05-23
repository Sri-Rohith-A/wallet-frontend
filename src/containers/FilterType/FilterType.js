import Filter from 'components/Filter/Filter';
import styles from './FilterType.module.scss';
import PropTypes from 'prop-types';

/**
 * @description this function is to render the Filter Types container
 * @version 1.0.0
 * @author [Abdul Adhil]
 */

const FilterType = ({ label, data, register, type }) => {
  return (
    <>
      <div className={styles['filter-type']}>
        <h5>{label}</h5>
        {data
          ? data.map((el, index) => {
              return (
                <Filter
                  key={index}
                  id={index}
                  value={el}
                  name={label}
                  type={type}
                  register={register}
                />
              );
            })
          : ''}
      </div>
    </>
  );
};
export default FilterType;
FilterType.propTypes = {
  label: PropTypes.string,
  data: PropTypes.array,
  type: PropTypes.string,
  register: PropTypes.object,
};
