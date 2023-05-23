import { useQuery } from 'react-query';
import ReportsServices from 'services/ReportServices';
import { REPORT_DATA, FILTER } from 'constants/query-constants';

const ReportData = {
  useGetFiltersData: () => {
    return useQuery({
      queryKey: FILTER,
      queryFn: () => ReportsServices.onLoadReportService(),
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    });
  },
  useGetReportsData: (query, currentPage, sort, column, currentRows) => {
    return useQuery({
      queryKey: [REPORT_DATA, query, currentPage, sort, column, currentRows],
      queryFn: () =>
        ReportsServices.getReportsService(query, currentPage, sort, column, currentRows),
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    });
  },
};
export default ReportData;
