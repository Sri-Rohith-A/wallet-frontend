import { useMutation, useQuery } from 'react-query';
import userServices from 'services/userService';
import { URL_CONSTANTS } from 'constants/url-constants';
const { USER } = URL_CONSTANTS;

export const useUsersData = (currentPage, sort, colum, current) => {
  return useQuery({
    queryKey: [USER.USERS, currentPage],
    queryFn: () => userServices.getUsersService(currentPage, sort, colum, current),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};

export const useUserData = (userId) => {
  return useQuery({
    queryKey: userId,
    queryFn: () => userServices.getUserService(userId),
    enabled: !!userId,
    refetchOnWindowFocus: false,
    staleTime: 5000,
  });
};
export const usePostUserData = (handleResponse) => {
  return useMutation(userServices.addUserService, {
    onSuccess: (data) => {
      handleResponse(data);
    },
  });
};
export const usePostStopMaternityCash = (handleResponse) => {
  return useMutation(userServices.stopMaternityCashService, {
    onSuccess: (data) => {
      handleResponse(data);
    },
  });
};

export const usePatchUserData = (handleResponse) => {
  return useMutation(userServices.updateUserDataService, {
    onSuccess: (data) => {
      handleResponse(data);
    },
  });
};
