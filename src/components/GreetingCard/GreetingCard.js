import React from 'react';
import { AppConstants } from 'constants/app-constants';
import styles from './GreetingCard.module.scss';
import { useGlobalContext } from '../../hooks/useCookieContext/useCookieContext';
/**
 * @description A reusable Greeting component with a greeting message.
 * @version 1.0.0
 * @author [Battepati Lokesh Reddy]
 */
const GreetingCard = () => {
  const { username } = useGlobalContext();
  return (
    <div className={styles['greeting-wrapper']}>
      <div className={styles['greeting-name']}>
        {`${AppConstants.DASH_BOARD_DEATILS.GREETING_MESSAGE} ${username}`}
      </div>
      <div className={styles['greeting-message-container']}>
        <p className={styles['greeting-message']}>
          {AppConstants.DASH_BOARD_DEATILS.WELCOME_MESSAGE}
        </p>
        <p className={styles['greeting-message']}>
          {AppConstants.DASH_BOARD_DEATILS.GREETING_WORK}
        </p>
      </div>
    </div>
  );
};

export default GreetingCard;
