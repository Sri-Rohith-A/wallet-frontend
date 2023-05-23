import { useMutation, useQuery } from 'react-query';
import userServices from 'services/userService';
import { URL_CONSTANTS } from 'constants/url-constants';
import { TRANSACTIONS } from 'constants/query-constants';
const { USER } = URL_CONSTANTS;

export const useUsersData = (currentPage, sort, column, current) => {
  return useQuery({
    queryKey: [USER.USERS, currentPage],
    queryFn: () => userServices.getUsersService(currentPage + 1, sort, column, current),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};

export const useUserData = (userId) => {
  return useQuery({
    queryKey: userId,
    queryFn: () => userServices.getUserService(userId),
    keepPreviousData: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};

export const useLocationAndBusinessData = () => {
  return useQuery({
    queryKey: 'locations-bu',
    queryFn: () => userServices.getBusinessAndLocations(),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
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

export const useUserTransactions = (currentPage, sort, column, current, employeeId) => {
  return useQuery({
    queryKey: [TRANSACTIONS, employeeId],
    queryFn: () =>
      userServices.getUserTransactions(currentPage + 1, sort, column, current, employeeId),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: false,
  });
};
