import style from './EventContainer.module.scss';
import EventCard from '../../components/EventCard/EventCard';
import { AppConstants, STARTED } from '../../constants/app-constants';
import { useMutation } from 'react-query';
import { useState, useEffect } from 'react';
import EventService from 'services/eventService';
import { StringHelper } from 'utils/stringHelper';
/**
 * @description Event card container
 * @version 1.0.0
 * @author [Rakhesh Bowtham, Abdul Adhil]
 */

const EventContainer = (props) => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    setEvents([
      ...(props.data.startedEvents ? props.data.startedEvents : []),
      ...(props.data.upComingEvents ? props.data.upComingEvents : []),
    ]);
  }, [props.data.upComingEvents]);

  // start stop delete event
  const EVENT_INFO = AppConstants.EVENT_INFO;
  const { mutate: startEvent } = useMutation(EventService.startEventService);
  const { mutate: stopEvent } = useMutation(EventService.stopEventService);
  const { mutate: deleteEvent } = useMutation(EventService.deleteEventService);

  const handleClick = (name, key) => {
    if (StringHelper.toLower(name) === StringHelper.toLower(EVENT_INFO.STARTEVENT)) {
      startEvent(
        { data: { eventStatus: EVENT_INFO.START }, id: key },
        {
          onSuccess: () => {
            const updateEvent = events.map((event) => {
              if (event.eventId === key) {
                return { ...event, eventStatus: STARTED };
              } else {
                return event;
              }
            });
            setEvents(updateEvent);
          },
        },
      );
    } else if (StringHelper.toLower(name) === StringHelper.toLower(EVENT_INFO.STOPEVENT)) {
      stopEvent(
        { data: { eventStatus: EVENT_INFO.STOP }, id: key },
        {
          onSuccess: () => {
            setEvents(events.filter((event) => event.eventId !== key));
            props.eventRefetch();
          },
        },
      );
    } else {
      deleteEvent(key, {
        onSuccess: () => {
          setEvents(events.filter((event) => event.eventId !== key));
        },
      });
    }
  };
  return (
    <div className={style['event-container']}>
      {events.length !== 0 ? (
        events.map((el) => {
          return (
            <EventCard
              key={el.eventId}
              eventName={el.eventName.toUpperCase()}
              eventStatus={el.eventStatus}
              startDate={el.startDate.toUpperCase()}
              endDate={el.endDate}
              click={(event) => handleClick(event, el.eventId)}
            />
          );
        })
      ) : (
        <h4>{AppConstants.NO_EVENTS_TITLE.EVENTS_MESSAGE}</h4>
      )}
    </div>
  );
};
export default EventContainer;
