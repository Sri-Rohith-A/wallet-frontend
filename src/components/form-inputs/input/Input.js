import PropTypes, { number, string } from 'prop-types';
import style from './Input.module.scss';

/**
 * @description this function will render the input field
 * @version 1.0.0
 * @author [Vishnuraj]
 */
const Input = ({ type, name, register, disabled, errors, value }) => {
  const handleNumberInput = (evt) => {
    type === 'number' && ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault();
  };
  return (
    <div className={style['input']}>
      <input
        type={type}
        defaultValue={value}
        disabled={disabled}
        {...register}
        onKeyDown={handleNumberInput}
        className={
          errors[name] ? `${style['input-error']} ${style['input-box']}` : style['input-box']
        }
      />
      {errors[name]?.type && <div className={style.errorBar}></div>}
      {errors[name] && <span className={style['error']}>{errors[name].message}</span>}
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
};
Input.defaultProps = {
  errors: {},
};
export default Input;
