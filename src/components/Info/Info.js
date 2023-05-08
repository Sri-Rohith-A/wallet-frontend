import { FaInfoCircle } from 'react-icons/fa';
import style from './Info.module.scss';
import { PropTypes } from 'prop-types';
/**
 * @description function to return a Info Component, which will render a Info icon, along with a custom message passed to it.
 * @version 1.0.0
 * @author [Hariboobaalan]
 * @param { message }
 * @returns Info Component
 */
const Info = ({ message }) => {
  return (
    <>
      <div className={style['information']}>
        <FaInfoCircle />
        <span className={style['info-message']}>{message}</span>
      </div>
    </>
  );
};
Info.propTypes = {
  message: PropTypes.string,
};
export default Info;
