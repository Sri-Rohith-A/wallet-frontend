import Filter from 'components/Filter/Filter';
import Title from 'components/Title/Title';
import styles from './Reports.module.scss';
import ContainerLayout from 'layouts/Containers/ContainerLayout';
import { AppConstants, ASC, DESC, DATE, ZERO, ALL, OBJECT } from 'constants/app-constants';
import { IoMdDownload } from 'react-icons/io';
import RadioGroup from 'components/form-inputs/RadioGroup/RadioGroup';
import { useState, useEffect } from 'react';
import ReportsFilters from 'containers/ReportsFilters/ReportsFilters';
import ReportsServices from 'services/ReportServices';
import ReportData from 'hooks/useReportsData/useReportsData';
import { useForm } from 'react-hook-form';
import ReportStats from 'containers/ReportStats/ReportStatus';
import { StringHelper } from 'utils/stringHelper';
import queryGenerator from 'utils/queryGenerator';
import CurrencyUtil from 'utils/currencyUtil';
import DateUtil from 'utils/dateFormatter';
import TableComponent from 'containers/Table/Table';
import { TableRows } from 'constants/Table/table-rows-constants';
/**
 * @description this function is to render the Reports page
 * @version 1.0.0
 * @author [Abdul Adhil]
 */

const Reports = () => {
  const [formattedData, setFormattedData] = useState([]);
  const [sort, setSort] = useState(ASC);
  const [column, setColumn] = useState(DATE);
  const [lastPage, setLastPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentRows, setCurrentRows] = useState(15);
  const [duration, setDuration] = useState('');
  const [location, setLocation] = useState('');

  /** * @description function to handle sort and setting sorting for each column * @version 1.0.0 * @params columnName,sortBy */ const handleSort =
    (columnName, sortBy) => {
      if (columnName === '') return;
      if (column !== columnName) {
        setSort(ASC);
      } else {
        sortBy === ASC ? (sortBy = DESC) : (sortBy = ASC);
        setSort(sortBy);
      }
      setColumn(columnName);
    };

  const { LABEL, MESSAGE, CUSTOM_REPORTS, PAYLOAD_STRUCTURE } = AppConstants.REPORTS_PAGE;
  const [generate, SetGenerate] = useState(false);
  const [reportFormData, setReportFormData] = useState('');
  const { data: data, isLoading } = ReportData.useGetFiltersData();
  const { data: reportData, refetch: reportsRefetch } = ReportData.useGetReportsData(
    reportFormData,
    currentPage + 1,
    sort,
    column,
    currentRows,
  );
  const filterData = data?.data?.data;
  //All Location appending to data
  filterData
    ? filterData.locations.includes(AppConstants.REPORTS_PAGE.ALL_LOCATION)
      ? ''
      : filterData.locations.unshift(AppConstants.REPORTS_PAGE.ALL_LOCATION)
    : '';

  useEffect(() => {
    if (formattedData != null) {
      reportsRefetch();
    }
  }, [currentPage, isLoading, sort, column]);

  useEffect(() => {
    let reports = reportData?.data?.data?.transactions || [];
    reports = reports.map((report) => {
      report.date = DateUtil.dateFormatter(report.date);
      if (typeof report.amount === 'number') {
        report.amount = `${CurrencyUtil.indianRupeeSymbol()} ${report.amount}`;
      }
      return report;
    });
    setFormattedData(reports);
    setLastPage(reportData?.data?.data?.totalPages || 1);
  }, [reportData]);
  //form submit event
  const onSubmit = (data) => {
    const newData = {};
    Object.keys(data).forEach((value, index) => {
      if (data[value] !== undefined) {
        //duration convertion
        if (StringHelper.toKebabCase(CUSTOM_REPORTS.duration.LABEL) === value) {
          //duration value
          setDuration(data ? data[value] : '');
          data[value] = StringHelper.toKebabCase(data[value]);
        } else if (
          value === StringHelper.toKebabCase(CUSTOM_REPORTS.locations.LABEL) &&
          data[StringHelper.toKebabCase(CUSTOM_REPORTS.locations.LABEL)][0] ===
            AppConstants.REPORTS_PAGE.ALL_LOCATION
        ) {
          data[value] = [
            StringHelper.toLower(
              data[StringHelper.toKebabCase(CUSTOM_REPORTS.locations.LABEL)][0].split(' ')[0],
            ),
          ];
        }
        if (value === StringHelper.toKebabCase(CUSTOM_REPORTS.records.LABEL)) {
          data[value] = PAYLOAD_STRUCTURE[data[value]];
        }
        newData[PAYLOAD_STRUCTURE[value]] =
          typeof data[value] === OBJECT ? data[value].join(',') : data[value];
      }
      // location value
      if (value === StringHelper.toKebabCase(CUSTOM_REPORTS.locations.LABEL)) {
        data
          ? data[value][ZERO] === ALL
            ? setLocation(AppConstants.REPORTS_PAGE.ALL_LOCATION)
            : setLocation(data ? data[value].join(',') : '')
          : '';
      }
    });

    setReportFormData(queryGenerator(newData));
    SetGenerate(true);
  };
  useEffect(() => {
    reportsRefetch();
  }, [reportFormData]);
  return (
    <>
      <div className={styles['reports-filters']}>
        <Title title={LABEL} />
        <div className={styles['filters-wrapper']}>
          <ReportsFilters data={filterData} submit={onSubmit} />
        </div>
      </div>
      {generate ? (
        <div className={styles['filtered-data']}>
          <Title title={AppConstants.REPORTS_PAGE.CDW_CASH_REPORT} />
          <p>
            {StringHelper.reportFilter(
              StringHelper.hyphenToCapital(duration),
              reportData?.data?.data?.fromDate,
              reportData?.data?.data?.toDate,
              location,
            )}
          </p>
          <ReportStats data={reportData?.data?.data} />

          {formattedData && (
            <div className={styles['reports-table']}>
              <TableComponent
                tableRows={TableRows.REPORTS}
                setCurrentPage={setCurrentPage}
                data={formattedData}
                sort={sort}
                column={column}
                lastPage={lastPage}
                currentPage={currentPage}
                handleSort={handleSort}
              />
            </div>
          )}
        </div>
      ) : (
        <div className={styles['report-message']}>
          <div className={styles['message-wrapper']}>
            <IoMdDownload
              fontSize={AppConstants.REPORTS_PAGE.FONT_SIZE.SIXTY_PX}
              color={AppConstants.REPORTS_PAGE.COLOR}
            />
            <h1>{MESSAGE}</h1>
          </div>
        </div>
      )}
    </>
  );
};
export default Reports;
