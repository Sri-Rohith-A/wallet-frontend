import { AppConstants } from 'constants/app-constants';
import OverViewTile from '../../components/OverViewTile/OverViewTile';
import style from './SalesOverview.module.scss';
import PropTypes from 'prop-types';
/**
 * @description sales overview container
 * @version 1.0.0
 * @author [Rakhesh Bowtham]
 * @param {selectedCard} selectedCard
 * @param {setSelectedCard} setSelectedCardFunction
 * @param {setSelectedData} setSelectedStatsDataFunction
 * @param {data} statsData
 * @returns sales overview container
 */

const SalesOverview = ({ selectedCard, setSelectedCard, setSelectedData, data }) => {
  const handleClick = (index, data) => {
    setSelectedCard(index);
    setSelectedData(data);
  };
  const salesData = [
    {
      timeInterval: AppConstants.DASH_BOARD.TODAY,
    },
    {
      timeInterval: AppConstants.DASH_BOARD.THIS_WEEK,
    },
    {
      timeInterval: AppConstants.DASH_BOARD.THIS_MONTH,
    },
    {
      timeInterval: AppConstants.DASH_BOARD.CARRY_OVER,
    },
  ];
  return (
    <div className={style['tile-container']}>
      {salesData.map((el, index) => (
        <OverViewTile
          key={index}
          timeInterval={AppConstants.DASH_BOARD.STATS_TITLE[el.timeInterval]}
          ammountSpent={data[el.timeInterval] || 0}
          cardIndex={index}
          activeCard={selectedCard}
          handleActiveCard={() => handleClick(index, el.timeInterval)}
        />
      ))}
    </div>
  );
};
SalesOverview.propTypes = {
  selectedCard: PropTypes.number.isRequired,
  setSelectedCard: PropTypes.func.isRequired,
  setSelectedData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};
export default SalesOverview;
