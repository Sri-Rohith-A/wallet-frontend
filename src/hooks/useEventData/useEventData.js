import { useQuery, useMutation } from 'react-query';
import eventService from 'services/eventService';
import { URL_CONSTANTS } from 'constants/url-constants';
const { EVENTS } = URL_CONSTANTS;

export const useEventData = (currentPage, sort, colum, current, newData) => {
  return useQuery({
    queryKey: [[EVENTS.ADD_EVENTS_ENDPOINT, newData], currentPage],
    queryFn: () => eventService.onLoadEventService(currentPage + 1, sort, colum, current),
  });
};

export const useEventDataPatch = (handleConfigs) => {
  return useMutation(eventService.onLoadEventService, {
    onSuccess: (data) => {
      handleConfigs(data);
    },
  });
};
