import PropTypes from 'prop-types';
import style from './Error.module.scss';

/**
 * @description this function will render the input field
 * @version 1.0.0
 * @author [Hariboobaalan]
 */
const Error = ({ name, errors }) => {
  return (
    <>
      {errors[name]?.type && <div className={style['error-bar']}></div>}
      {errors[name] && <span className={style['error']}>{errors[name].message}</span>}
    </>
  );
};

Error.propTypes = {
  name: PropTypes.string,
  errors: PropTypes.object,
};
Error.defaultProps = {
  errors: {},
};
export default Error;
