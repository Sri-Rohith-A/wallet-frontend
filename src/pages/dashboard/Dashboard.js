import Title from 'components/Title/Title';
import ContainerLayout from 'layouts/Containers/ContainerLayout';
import GreetingCard from 'components/GreetingCard/GreetingCard';
import styles from './Dashboard.module.scss';
import { AppConstants, TODAY } from 'constants/app-constants';
import SalesOverview from 'containers/SalesOverview/SalesOverview';
import StatsContainer from 'containers/StatsContainer/StatsContainer';
import { useState, useEffect } from 'react';
import { useStatsData } from 'hooks/useStatsData/useStatsData';

/**
 * @description Dashboard page
 * @version 1.0.0
 * @author [Rakhesh Bowtham]
 * @returns Dashboard page
 */

const Dashboard = () => {
  const [selectedCard, setSelectedCard] = useState(0);
  const [selectedData, setSelectedData] = useState(TODAY);
  // getting stats data from useStatsData hook
  const { data: statsData, isLoading, refetch } = useStatsData(selectedData);
  useEffect(() => {
    refetch();
  }, [selectedData]);
  if (isLoading) {
    return <h1>Loading..</h1>;
  }
  const data = statsData?.data?.data;
  const currentDate = new Date();
  const currentMonth = currentDate
    .toLocaleString(AppConstants.DATE_CONSTANTS.DEFAULT, {
      month: AppConstants.DATE_CONSTANTS.LONG,
    })
    .toUpperCase();
  const currentYear = currentDate.getFullYear();
  return (
    <>
      <div className={styles['sales-overview']}>
        <div className={styles['dashboard-overview-container']}>
          <ContainerLayout>
            <Title title={AppConstants.DASH_BOARD_DEATILS.LABEL} />
            <GreetingCard />
            <p
              className={styles['sales-heading']}
            >{`SALES OVERVIEW - ${currentMonth} ${currentYear}`}</p>
            <SalesOverview
              selectedCard={selectedCard}
              setSelectedCard={setSelectedCard}
              setSelectedData={setSelectedData}
              data={data}
            />
          </ContainerLayout>
        </div>
        <div className={styles['dashboard-stats-container']}>
          <ContainerLayout>
            <StatsContainer selectedData={selectedData} data={data} />
          </ContainerLayout>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
