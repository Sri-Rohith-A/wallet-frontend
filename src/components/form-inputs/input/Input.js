import PropTypes, { number, string } from 'prop-types';
import style from './Input.module.scss';
import Error from 'components/Error/Error';
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
};
Input.defaultProps = {
  errors: {},
};
export default Input;
