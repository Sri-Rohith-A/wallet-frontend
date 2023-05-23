import React from 'react';
import { useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import styles from './Dropdown.module.scss';
import PropTypes from 'prop-types';

/**
 * * @decription A reusable Dropdown component with a customizable selecting options to select.
 * @version 1.0.0
 * @param {Array} options
 * @param {string} selected
 * @param {Function} setQuery
 * @author [Battepati Lokesh Reddy]
 */

const Dropdown = ({ options, selected, setSelected }) => {
  const [isActive, setIsActive] = useState(false);

  // Dropdown component markup here
  return (
    <div className={styles['dropdown']}>
      <div
        data-testid='dropdown-btn'
        className={styles['dropdown-btn']}
        onClick={(e) => setIsActive(!isActive)}
      >
        {selected}
        <FaCaretDown />
      </div>
      {isActive && (
        <div className={styles['dropdown-content']}>
          {options.map((option, index) => (
            <div
              data-testid={`dropdown-item-${index}`}
              className={styles['dropdown-item']}
              key={index}
              onClick={(e) => {
                setSelected(option);
                setIsActive(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
Dropdown.propTypes = {
  options: PropTypes.array.isRequired,
  selected: PropTypes.string,
  setSelected: PropTypes.func.isRequired,
};
export default Dropdown;
