import React from 'react';
import style from './AmountCard.module.scss';
import CurrencyUtil from '../../utils/currencyUtil';
import PropTypes from 'prop-types';

/**
 * * @decription A reusable Databox component with a customizable way.
 * @version 1.0.0
 * @param {string} label
 * @param {string} amountSpent
 * @param {string} percent
 * @param {string} color
 * @param {string} border
 * @author [Battepati Lokesh Reddy]
 *
 */

const AmountCard = ({ label, amountSpent, percent, color, border, isMoney }) => {
  if (!percent) {
    return (
      <div
        className={`${style['card-wrapper']} ${style[`background-${color}`]} ${
          style[`border-${border}`]
        }`}
      >
        <div>{label}</div>
        <span className={`${style['currency-symbol']}`}>
          {isMoney ? CurrencyUtil.indianRupeeSymbol() : ''}
          {CurrencyUtil.currencyFormatters(amountSpent)}
        </span>
      </div>
    );
  } else {
    return (
      <div className={style.flexbox}>
        <div className={style.statsbox}>
          <AmountCard label={label} amountSpent={amountSpent} color={color} border={border} />
        </div>
        <div className={style.percent}>
          {percent} <span className={style['percent-symbol']}>&#37;</span>
        </div>
      </div>
    );
  }
};
AmountCard.propTypes = {
  label: PropTypes.string.isRequired,
  amountSpent: PropTypes.number.isRequired,
  percent: PropTypes.number,
  color: PropTypes.string.isRequired,
  border: PropTypes.string,
};
AmountCard.defaultProps = {
  isMoney: true,
};
export default AmountCard;
