import { useQuery } from 'react-query';
import addMoneyServices from 'services/addMoneyServices';
import { URL_CONSTANTS } from 'constants/url-constants';
import { apiInstance } from 'api/axios-instance';
const { ADD_MONEY } = URL_CONSTANTS;

export const getCashBucket = () => {
  return useQuery({
    queryKey: ADD_MONEY.CASH,
    queryFn: () => addMoneyServices.getCashBucket(),
    refetchOnWindowFocus: false,
    staleTime: 5000,
  });
};

export const getEmployee = (id, bucketId) => {
  return useQuery({
    queryKey: [id, bucketId],
    queryFn: () => addMoneyServices.getEmployee(id, bucketId),
    refetchOnWindowFocus: false,
    staleTime: 5000,
  });
};

export const getMaternity = (id) => {
  return useQuery({
    queryKey: id,
    queryFn: () => addMoneyServices.getMaternity(id),
    refetchOnWindowFocus: false,
    staleTime: 5000,
  });
};

export const getCdw = (id) => {
  return useQuery({
    queryKey: [ADD_MONEY.CASH],
    queryFn: () => addMoneyServices.getCdw(id),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};

export const getEvents = () => {
  return useQuery({
    queryKey: [ADD_MONEY.CASH],
    queryFn: () => addMoneyServices.getEvents(),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};

export const addCdwCash = async (data) => {
  try {
    const response = await addMoneyServices.addMoney(data);
    return response;
  } catch (error) {
    return error.mssage;
  }
};
