import styles from './StatsContainer.module.scss';
import AmountCard from 'components/Amountcard/AmountCard';
import { AppConstants } from 'constants/app-constants';
import PropTypes from 'prop-types';
import Title from 'components/Title/Title';

/**
 * @description stats container
 * @version 1.0.0
 * @author [Rakhesh Bowtham]
 * @param {selectedData} SelectedStataData
 * @param {data} StatsData
 * @returns satats container
 */

const StatsContainer = ({ selectedData, data }) => {
  return (
    <div className={styles['stats-container']}>
      <div>
        <Title title={AppConstants.DASH_BOARD.STATS_TITLE[selectedData]} />
        <div className={styles['space']}>
          <AmountCard
            label={AppConstants.DASH_BOARD.OVERALL_SALES}
            amountSpent={data[AppConstants.DASH_BOARD.TOTAL_SALES].overallSales}
            color={AppConstants.DASH_BOARD.COLORS.OVERALL_SALES}
          />
        </div>
        <div>
          <AmountCard
            label={AppConstants.DASH_BOARD.TRANSFERED_AMMOUNT}
            amountSpent={data[AppConstants.DASH_BOARD.TOTAL_SALES].transferredAmount}
            color={AppConstants.DASH_BOARD.COLORS.OVERALL_SALES}
          />
        </div>
        <p className={styles['stats-title']}>LOCATION WISE SPENDING</p>
        {data[AppConstants.DASH_BOARD.LOCATION_WISE_SPENDING].map((el, index) => (
          <div key={index}>
            <AmountCard
              label={el.location_name}
              amountSpent={el.amountSpent}
              color={AppConstants.DASH_BOARD.COLORS.LOCATION_WISE_SPENDING}
              percent={el.amountSpentPercent}
            />
          </div>
        ))}
        <p className={styles['stats-title']}>BU WISE SPENDING</p>
        {data[AppConstants.DASH_BOARD.BU_WISE_SPENDING].map((el, index) => (
          <div key={index}>
            <AmountCard
              label={el.buName}
              amountSpent={el.amountSpent}
              color={AppConstants.DASH_BOARD.COLORS.BU_WISE_SPENDING}
              percent={el.amountSpentPercent}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
StatsContainer.propTypes = {
  selectedData: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};
export default StatsContainer;
