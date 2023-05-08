import EventForm from '../../containers/Forms/EventForm/EventForm';
import styles from './Events.module.scss';
import EventContainer from 'containers/EventContainer/EventContainer';
import TableComponent from 'containers/Table/Table';
import { TableColumn } from '../../constants/Table/table-column-constants';
import { TableRows } from '../../constants/Table/table-rows-constants';
import { useEffect, useState, useCallback } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import eventService from 'services/eventService';
import Title from 'components/Title/Title';
import { AppConstants } from 'constants/app-constants';
import ContainerLayout from 'layouts/Containers/ContainerLayout';

/**
 * @description this function is to render the Events page
 * @version 1.0.0
 * @author [Abdul Adhil,Pavithra G]
 */
const EventsPage = () => {
  const [eventData, setEventData] = useState([]);
  const [newData, setNew] = useState(true);
  const [pastEvent, setPastEvent] = useState([]);

  // event-container
  const queryData = useQuery(['events', newData], eventService.onLoadEventService);
  const { data } = queryData;

  useEffect(() => {
    if (data) {
      setEventData(data.data.data);
      const new_event = [];
      const pastEventData = data.data.data.pastEvents ? data.data.data.pastEvents : [];
      pastEventData.map((el) => {
        new_event.push(el);
      });
      setPastEvent(pastEventData);
    }
  }, [data]);

  const reLoad = useCallback(() => {
    setNew((prev) => !prev);
  }, []);
  return (
    <>
      <ContainerLayout>
        <div className={styles['events']}>
          <Title title={AppConstants.EVENTS_PAGE.EVENTS_TITLE} />
          <div>
            <h3 className={styles['events-title']} onClick={() => setNew((prev) => !prev)}>
              {AppConstants.EVENTCARD_TITLE.EVENT_TITLE}
            </h3>

            <EventContainer data={eventData} />
            <div>
              <h3 className={styles['past-event-title']}>
                {AppConstants.PASTEVENT_TITLE.EVENT_TITLE}
              </h3>
            </div>
          </div>
        </div>
      </ContainerLayout>
      <div className={styles['form-module']}>
        <div className={styles['events-form']}>
          <Title title={AppConstants.EVENTS_PAGE.FORM_TITLE} />
          <EventForm changeState={reLoad} />
        </div>
      </div>
    </>
  );
};

export default EventsPage;
