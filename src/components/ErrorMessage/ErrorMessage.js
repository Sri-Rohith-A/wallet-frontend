import PropTypes from 'prop-types';
import style from './ErrorMessage.module.scss';

/**
 * @description this function will render the error message for form
 * @version 1.0.0
 * @author [Sai Kishore]
 */
const ErrorMessage = ({ errors }) => {
  return (
    <div data-testid='errorComponent' className={style['error']}>
      {errors}
    </div>
  );
};

ErrorMessage.propTypes = {
  errors: PropTypes.string,
};
export default ErrorMessage;
