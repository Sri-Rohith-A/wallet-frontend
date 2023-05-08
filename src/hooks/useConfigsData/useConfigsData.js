import { useQuery, useMutation } from 'react-query';
import { GET_CONFIGS } from 'constants/query-constants';
import { configGetService, configPatchService } from 'services/configService';

export const useConfigsData = () => {
  return useQuery({
    queryKey: GET_CONFIGS,
    queryFn: () => configGetService(),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};

export const useConfigsPatch = (handleConfigsSave) => {
  return useMutation(configPatchService, {
    onSuccess: (data) => {
      handleConfigsSave(data);
    },
  });
};
