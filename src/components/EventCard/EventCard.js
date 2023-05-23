import style from './EventCard.module.scss';
import PropTypes from 'prop-types';
import DateUtil from '../../utils/dateFormatter';
import Button from '../Button/Button';
import { useState } from 'react';
import { AppConstants } from '../../constants/app-constants';
import ConfirmationBox from 'components/ConfirmationBox/ConfirmationBox';
import { StringHelper } from 'utils/stringHelper';

/**
 * @description event card info card component
 * @version 1.0.0
 * @author [Rakhesh Bowtham]
 * @param { eventName,eventStatus,startDate,endDate }
 */

const EventCard = ({ eventName, eventStatus, startDate, endDate, click }) => {
  const EVENT_INFO = AppConstants.EVENT_INFO;
  const BUTTON = AppConstants.BUTTON;

  const [startShow, setStartShow] = useState(false);
  const [stopShow, setStopShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const handleClick = (name) => {
    click(name);
    handleClose();
  };
  const handleClose = () => {
    setStartShow(false);
    setDeleteShow(false);
    setStopShow(false);
  };

  return (
    <>
      <div className={style['event-card']}>
        <p className={style['event-name']}>{eventName}</p>
        <p data-testid='event date' className={style['event-date']}>
          {DateUtil.dateFormatter(startDate)} - {DateUtil.dateFormatter(endDate)}
        </p>
        {eventStatus == EVENT_INFO.UPCOMING_EVENT ? (
          <>
            <Button
              color={BUTTON.COLOR.SECONDARY}
              size={BUTTON.SIZE.L}
              shape={BUTTON.SHAPE.SOLID}
              label={EVENT_INFO.STARTEVENT}
              click={() => {
                setStartShow(true);
              }}
            />
            <a
              className={style['delete-tag']}
              onClick={() => {
                setDeleteShow(true);
              }}
            >
              {AppConstants.EVENTS_DELETE_EVENT.MESSAGE}
            </a>
          </>
        ) : null}
        {eventStatus == EVENT_INFO.ONGOING_EVENT ? (
          <Button
            color={BUTTON.COLOR.PRIMARY}
            size={BUTTON.SIZE.L}
            shape={BUTTON.SHAPE.SOLID}
            label={EVENT_INFO.STOPEVENT}
            click={() => {
              setStopShow(true);
            }}
          />
        ) : null}
      </div>
      {startShow && (
        // eslint-disable-next-line react/jsx-no-undef
        <ConfirmationBox
          title={AppConstants.EVENTS_CONFIRM_BOX.START_EVENT_TITLE}
          desc={AppConstants.EVENTS_CONFIRM_BOX.EVENTS_START_MESSAGE}
          button={EVENT_INFO.STARTEVENT}
          close={handleClose}
          click={(event) => handleClick(EVENT_INFO.STARTEVENT)}
        />
      )}
      {stopShow && (
        // eslint-disable-next-line react/jsx-no-undef
        <ConfirmationBox
          title={AppConstants.EVENTS_CONFIRM_BOX.STOP_EVENT_TITLE}
          desc={AppConstants.EVENTS_CONFIRM_BOX.EVENTS_STOP_MESSAGE}
          button={EVENT_INFO.STOPEVENT}
          close={handleClose}
          click={(event) => handleClick(EVENT_INFO.STOPEVENT)}
        />
      )}
      {deleteShow && (
        // eslint-disable-next-line react/jsx-no-undef
        <ConfirmationBox
          title={AppConstants.EVENTS_CONFIRM_BOX.DELETE_EVENT_TITLE}
          desc={AppConstants.EVENTS_CONFIRM_BOX.EVENTS_DELETE_MESSAGE}
          button={AppConstants.EVENTS_DELETE_EVENT.MESSAGE}
          close={handleClose}
          click={(event) => handleClick(AppConstants.EVENTS_DELETE_EVENT.MESSAGE)}
        />
      )}
    </>
  );
};
EventCard.propTypes = {
  eventName: PropTypes.string.isRequired,
  eventStatus: PropTypes.oneOf(['upcoming', 'Ongoing', 'started']).isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  click: PropTypes.func,
};
export default EventCard;
