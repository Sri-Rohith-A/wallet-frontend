import EventForm from '../../containers/Forms/EventForm/EventForm';
import styles from './Events.module.scss';
import EventContainer from 'containers/EventContainer/EventContainer';
import TableComponent from 'containers/Table/Table';
import { TableColumn } from '../../constants/Table/table-column-constants';
import { TableRows } from '../../constants/Table/table-rows-constants';
import { useEffect, useState, useCallback } from 'react';
import { useQuery } from 'react-query';
import eventService from 'services/eventService';
import Title from 'components/Title/Title';
import ContainerLayout from 'layouts/Containers/ContainerLayout';
import {
  ASC,
  DESC,
  NUMERIC,
  SHORT,
  TWO_DIGIT,
  AppConstants,
  AM,
  PM,
} from 'constants/app-constants';
import { useEventData } from 'hooks/useEventData/useEventData';
import ConfirmationBox from 'components/ConfirmationBox/ConfirmationBox';
import DateUtil from 'utils/dateFormatter';
/**
 * @description this function is to render the Events page
 * @version 1.0.0
 * @author [Abdul Adhil,Pavithra G]
 */
const EventsPage = () => {
  const [eventData, setEventData] = useState([]);
  const [newData, setNew] = useState(true);
  const [pastEvent, setPastEvent] = useState([]);
  const [sort, setSort] = useState(ASC);
  const [column, setColumn] = useState(AppConstants.DATE_CONSTANTS.CREATION_DATE);
  const [lastPage, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [current, set] = useState(15);

  // get all data
  const {
    data,
    refetch: eventRefetch,
    isLoading: isEventsLoading,
  } = useEventData(currentPage, sort, column, current, newData);

  /**
   * @description function to handle sort and setting sorting for each column
   * @version 1.0.0
   * @params columnName,sortBy
   */
  const handleSort = (columnName, sortBy) => {
    if (columnName === '') return;
    if (column !== columnName) {
      setSort(ASC);
    } else {
      sortBy === ASC ? (sortBy = DESC) : (sortBy = ASC);
      setSort(sortBy);
    }
    setColumn(columnName);
  };
  function formatDate(date) {
    const options = {
      year: NUMERIC,
      month: SHORT,
      day: TWO_DIGIT,
      hour: NUMERIC,
      minute: TWO_DIGIT,
      hour12: true,
    };

    const formattedDate = date.toLocaleString(AppConstants.DATE_CONSTANTS.EN_US, options);
    return formattedDate;
  }
  // get eventsData
  useEffect(() => {
    if (data) {
      setEventData(data?.data?.data || []);
      const newEvent = [];
      const pastEventData = data?.data?.data?.pastEvents || [];
      pastEventData.map((events) => {
        events.creationDate = DateUtil.dateFormatter(events.creationDate);
        const time = events.startDate.slice(11, 16);
        const hours = parseInt(time.slice(0, 2));
        const totalTime = hours >= 12 ? PM : AM;
        events.startDate =
          DateUtil.dateFormatter(events.startDate) +
          ' ' +
          events.startDate.slice(11, 16) +
          ' ' +
          totalTime;
        const endTime = events.endDate.slice(11, 16);
        const endHours = parseInt(endTime.slice(0, 2));
        const total = endHours >= 12 ? PM : AM;
        events.endDate =
          DateUtil.dateFormatter(events.endDate) + ' ' + events.endDate.slice(11, 16) + ' ' + total;
        newEvent.push(events);
        events.transactions = {
          id: events.eventId,
        };
        return events;
      });
      setPastEvent(pastEventData);
      setTotalPages(data?.data?.data.pastEventsPages);
    }
  }, [data]);

  useEffect(() => {
    eventRefetch();
  }, [currentPage, sort, column]);

  const reLoad = useCallback(() => {
    setNew((prev) => !prev);
  }, []);
  return (
    <>
      <ContainerLayout>
        <div className={styles['events']}>
          <Title title={AppConstants.EVENTS_PAGE.EVENTS_TITLE} />
          <div className={styles['events-details']}>
            <h3 className={styles['events-title']}>{AppConstants.EVENTCARD_TITLE.EVENT_TITLE}</h3>
            <EventContainer data={eventData} eventRefetch={eventRefetch} />
            <div></div>
            <div>
              <h3 className={styles['past-event-title']}>
                {AppConstants.PASTEVENT_TITLE.EVENT_TITLE}
              </h3>
              <div className={styles['event-table']}>
                <TableComponent
                  className={styles['table']}
                  tableColumn={TableColumn.PAST_EVENTS}
                  tableRows={TableRows.PAST_EVENTS}
                  setCurrentPage={setCurrentPage}
                  data={pastEvent}
                  sort={sort}
                  column={column}
                  lastPage={lastPage}
                  currentPage={currentPage}
                  handleSort={handleSort}
                />
              </div>
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
