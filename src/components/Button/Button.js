import React from 'react';

import styles from './Button.module.scss';
import { PropTypes } from 'prop-types';

/**
 * @description function to will render the button component
 * @version 1.0.0
 * @author [Abdul Adhil, Battepati Lokesh Reddy]
 */
const Button = ({ color, size, label, border, icon, click }) => {
  const customStyling = `${styles['button']} ${color ? styles[color] : ''} ${
    size ? styles['button-' + size] : ''
  } ${border ? styles['border-' + border] : ''}`;

  return (
    <button className={`${customStyling}`} onClick={click}>
      {label}
      {icon ? <span>{icon}</span> : ''}
    </button>
  );
};
Button.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
  label: PropTypes.string,
  border: PropTypes.string,
  icon: PropTypes.object,
  click: PropTypes.func,
};
export default Button;
