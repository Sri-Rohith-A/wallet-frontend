import styles from './ReportStats.module.scss';
import { IoMdDownload } from 'react-icons/io';
import Button from 'components/Button/Button';
import AmountCard from 'components/Amountcard/AmountCard';
import { AppConstants } from 'constants/app-constants';
const ReportStats = ({ data }) => {
  const { REPORT_STATS_TILE } = AppConstants.REPORTS_PAGE;

  return (
    <>
      <div className={styles['reports-summary']}>
        <div className={styles['report-stats']}>
          <AmountCard
            label={REPORT_STATS_TILE.TOTAL_AMOUNT}
            amountSpent={data ? data.totalAmt : 0}
            color={AppConstants.COLOR.GREEN}
            border={AppConstants.STYLES.BORDER.ROUND}
          />
          <AmountCard
            label={REPORT_STATS_TILE.CO_WORKER}
            amountSpent={data ? data.coworkersBenefitted : 0}
            color={AppConstants.COLOR.YELLOW}
            border={AppConstants.STYLES.BORDER.ROUND}
            isMoney={false}
          />
          <div>
            <Button
              label={REPORT_STATS_TILE.DOWNLOAD_BUTTON}
              size={AppConstants.BUTTON.SIZE.XXL}
              color={AppConstants.BUTTON.COLOR.SECONDARY}
              border={AppConstants.BUTTON.SHAPE.ROUND}
              icon={<IoMdDownload fontSize={AppConstants.STYLES.FONT.SIZE.TWENTY_TWO_PX} />}
            />
          </div>
        </div>
        <div className={styles['reports-table']}></div>
      </div>
    </>
  );
};
export default ReportStats;
