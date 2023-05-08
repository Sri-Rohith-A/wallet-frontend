import style from './OverViewTile.module.scss';
import PropTypes from 'prop-types';
import CurrencyUtil from '../../utils/currencyUtil';
/**
 * @description sales overview card component
 * @version 1.0.0
 * @author [Rakhesh Bowtham]
 * @param { timeInterval, ammountSpent, handleActiveCard, cardIndex, activeCard }
 * @returns sales overview card component
 */

const OverViewTile = ({ timeInterval, ammountSpent, handleActiveCard, cardIndex, activeCard }) => {
  return (
    <div
      className={`${style['card']} ${cardIndex === activeCard ? style['active'] : ''}`}
      onClick={handleActiveCard}
    >
      <p className={style['card-name']}>{`${timeInterval}`}</p>
      {ammountSpent && (
        <p className={style['card-data']}>
          {CurrencyUtil.indianRupeeSymbol()} {CurrencyUtil.currencyFormatters(ammountSpent)}
        </p>
      )}
    </div>
  );
};
OverViewTile.propTypes = {
  timeInterval: PropTypes.string.isRequired,
  ammountSpent: PropTypes.number.isRequired,
  handleActiveCard: PropTypes.func.isRequired,
  cardIndex: PropTypes.number.isRequired,
  activeCard: PropTypes.number.isRequired,
};
export default OverViewTile;
