import { useQuery } from 'react-query';
import { GET_STATS } from 'constants/query-constants';
import statsGetService from 'services/statsService';

export const useStatsData = (selectedData) => {
  return useQuery({
    queryKey: GET_STATS,
    queryFn: () => statsGetService(selectedData),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};
