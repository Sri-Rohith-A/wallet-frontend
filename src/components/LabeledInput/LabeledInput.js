import React from 'react';
import PropTypes from 'prop-types';
import Input from '../form-inputs/input/Input';
import { Label } from '../form-inputs/label/Label';
import styles from './LabeledInput.module.scss';

/**
 * @description this function will return the labeled inputbox
 * @version 1.0.0
 * @author [Vishnuraj]
 */

const LabeledInput = ({ type, name, register, errors, disabled, labelColor, value }) => {
  return (
    <div className={styles['input-label']}>
      <Label name={name} color={labelColor} />
      <Input
        type={type}
        name={name}
        value={value}
        disabled={disabled}
        register={register}
        errors={errors}
      />
    </div>
  );
};

LabeledInput.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  register: PropTypes.object,
  errors: PropTypes.object,
  labelColor: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default LabeledInput;
