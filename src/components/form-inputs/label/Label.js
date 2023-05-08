import PropTypes from 'prop-types';
import style from './Label.module.scss';

/**
 * @description this function will render the label for inputs
 * @version 1.0.0
 * @author [Vishnuraj]
 */
export const Label = ({ name, color }) => {
  return (
    <>
      <label htmlFor={name} className={`${style['label']} ${style[color + '-color']}`}>
        {name}
      </label>
    </>
  );
};

Label.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
};
