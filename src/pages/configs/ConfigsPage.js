import { useState } from 'react';
import { AppConstants } from '../../constants/app-constants';
import styles from './ConfigsPage.module.scss';
import AppDetails from '../../components/app-details/AppDetails';
import ConfigRightContainer from '../../containers/configForm/ConfigForm';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { IoIosArrowForward } from 'react-icons/io';
import Title from 'components/Title/Title';
import ContainerLayout from 'layouts/Containers/ContainerLayout';
import { set } from 'react-hook-form';

/**
 * @description this function is to render the config page
 * @version 1.0.0
 * @author [Abdul Adhil, Joel]
 */

const ConfigsPage = () => {
  const [tabIndex, setTabIndex] = useState(1);
  return (
    <Tabs
      selectedIndex={tabIndex}
      onSelect={(index) => setTabIndex(index)}
      className={styles['config-tabs']}
      selectedTabClassName={styles['active-tab']}
      selectedTabPanelClassName={styles['contents']}
    >
      <div className={styles['tabs-bar']}>
        <Title title={AppConstants.CONFIG_HEADINGS.LABEL} />
        <ContainerLayout>
          <TabList>
            <Title title={AppConstants.CONFIG.LABEL} />
            <Tab>
              {AppConstants.CONFIGS_TABS.FIRST_TAB}
              <span>
                <IoIosArrowForward />
              </span>
            </Tab>
            <Tab>
              {AppConstants.CONFIGS_TABS.SECOND_TAB}
              <span>
                <IoIosArrowForward />
              </span>
            </Tab>
          </TabList>
        </ContainerLayout>
      </div>
      <ContainerLayout>
        <TabPanel>
          <Title title={AppConstants.CONFIG_HEADINGS.CONFIG_CONTENT[tabIndex]} />
          <AppDetails />
        </TabPanel>
        <TabPanel>
          <Title title={AppConstants.CONFIG_HEADINGS.CONFIG_CONTENT[tabIndex]} />
          <ConfigRightContainer />
        </TabPanel>
      </ContainerLayout>
    </Tabs>
  );
};

export default ConfigsPage;
