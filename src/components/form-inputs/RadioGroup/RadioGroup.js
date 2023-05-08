import React from 'react';
import style from './RadioGroup.module.scss';
import { Label } from '../label/Label';
import Info from '../../Info/Info';
import PropTypes, { number, string } from 'prop-types';
/**
 * @description function to return a radio group, in which the options are dynamically generated from an object passed to it.
 * @version 1.0.0
 * @author [Hariboobaalan]
 * @param { labelName, options, selectedOption, onChange, register, infoText }
 * @returns RadioGroup
 */
const RadioGroup = ({ labelName, options, selectedOption, onChange, register, infoText }) => {
  return (
    <div className={style['labeled-radio-group']}>
      <Label color={'black'} name={labelName} />
      <div className={style['radio-group']}>
        {options.map((option) => (
          <label
            key={option.value}
            className={`${style['radio-label']} ${
              style[selectedOption == option.value ? 'selected' : '']
            }`}
          >
            <input
              type='radio'
              {...register}
              value={option.value}
              checked={selectedOption === option.value}
              onChange={() => onChange(option.value)}
            />
            {option.label}
          </label>
        ))}
      </div>
      <Info message={infoText} />
    </div>
  );
};
RadioGroup.propTypes = {
  labelName: PropTypes.string,
  options: PropTypes.array,
  selectedOption: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func,
  register: PropTypes.object,
  infoText: PropTypes.string,
};
export default RadioGroup;
