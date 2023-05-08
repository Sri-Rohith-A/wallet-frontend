import style from './EventCard.module.scss';
import PropTypes from 'prop-types';
import DateUtil from '../../utils/dateFormatter';
import Button from '../Button/Button';
import { AppConstants } from '../../constants/app-constants';

/**
 * @description event card info card component
 * @version 1.0.0
 * @author [Rakhesh Bowtham]
 * @param { eventName,eventStatus,startDate,endDate }
 */

const EventCard = ({ eventName, eventStatus, startDate, endDate, click }) => {
  const EVENT_INFO = AppConstants.EVENT_INFO;
  const BUTTON = AppConstants.BUTTON;
  return (
    <div className={style['event-card']}>
      <p className={style['event-name']}>{eventName}</p>
      <p className={style['event-date']}>
        {DateUtil.dateFormatter(startDate)} - {DateUtil.dateFormatter(endDate)}
      </p>
      {eventStatus == EVENT_INFO.UPCOMING_EVENT ? (
        <>
          <Button
            color={BUTTON.BUTTON_COLOR_SECONDARY}
            size={BUTTON.BUTTON_SIZE_L}
            shape={BUTTON.BUTTON_SHAPE_SOLID}
            label={EVENT_INFO.STARTEVENT}
            click={click}
          />
          <a className={style['delete-tag']} onClick={click}>
            Delete Event
          </a>
        </>
      ) : null}
      {eventStatus == EVENT_INFO.ONGOING_EVENT ? (
        <Button
          color={BUTTON.BUTTON_COLOR_PRIMARY}
          size={BUTTON.BUTTON_SIZE_L}
          shape={BUTTON.BUTTON_SHAPE_SOLID}
          label={EVENT_INFO.STOPEVENT}
          click={click}
        />
      ) : null}
    </div>
  );
};
EventCard.propTypes = {
  eventName: PropTypes.string.isRequired,
  eventStatus: PropTypes.oneOf(['upcoming', 'Ongoing']).isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  click: PropTypes.func,
};
export default EventCard;
