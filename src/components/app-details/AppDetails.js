import { AppConstants } from '../../constants/app-constants';
import styles from './AppDetails.module.scss';

/**
 * @description this function will render the app version and the developers name
 * @version 1.0.0
 * @author [Abdul Adhil]
 */

const AppDetails = () => {
  return (
    <>
      <div className={styles['app-details']}>
        <h3>{AppConstants.APP_DETAILS.APP_VERSION.LABEL}</h3>
        <p>{AppConstants.APP_DETAILS.APP_VERSION.VERSION}</p>
        <h3>{AppConstants.APP_DETAILS.DEVELOPER_DETAILS.LABEL}</h3>
        <ul>
          {AppConstants.APP_DETAILS.DEVELOPER_DETAILS.DEVELOPERS.map((value, index) => {
            return <li key={index}>{value}</li>;
          })}
        </ul>
      </div>
    </>
  );
};

export default AppDetails;
