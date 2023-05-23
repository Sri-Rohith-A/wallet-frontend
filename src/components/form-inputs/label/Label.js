import PropTypes from 'prop-types';
import style from './Label.module.scss';
import { StringHelper } from 'utils/stringHelper';

/**
 * @description this function will render the label for inputs
 * @version 1.0.0
 * @author [Vishnuraj]
 */
export const Label = ({ name, color, labelText }) => {
  return (
    <>
      <label
        htmlFor={StringHelper.toSnakeCase(name)}
        className={`${style['label']} ${style[color + '-color']}`}
      >
        {labelText ? labelText : name}
      </label>
    </>
  );
};

Label.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  labelText: PropTypes.string,
};
