import PropTypes, { number, string } from 'prop-types';
import style from './Input.module.scss';
import Error from 'components/Error/Error';
import { INPUT_TYPES, PLUS_SIGN, MINUS_SIGN, EXPONENTIATION, ZERO } from 'constants/app-constants';
/**
 * @description this function will render the input field
 * @version 1.0.0
 * @author [Vishnuraj]
 */
const Input = ({ type, name, register, disabled, errors, value, change, defaultValue }) => {
  const handleNumberInput = (evt) => {
    type === INPUT_TYPES.NUMBER &&
      [EXPONENTIATION.e, EXPONENTIATION.E, PLUS_SIGN, MINUS_SIGN].includes(evt.key) &&
      evt.preventDefault();
  };
  return (
    <div data-testid='input-test' className={style['input']}>
      <input
        type={type}
        defaultValue={defaultValue}
        value={value}
        disabled={disabled}
        {...register}
        onKeyDown={handleNumberInput}
        className={
          errors[name] ? `${style['input-error']} ${style['input-box']}` : style['input-box']
        }
        {...(type === INPUT_TYPES.NUMBER && { min: ZERO })}
        {...(change && { onChange: change })}
      />
      <Error name={name} errors={errors} />
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  name: PropTypes.string,
  disabled: PropTypes.bool,
  register: PropTypes.object,
  errors: PropTypes.object,
  change: PropTypes.func,
  defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
Input.defaultProps = {
  errors: {},
};
export default Input;
