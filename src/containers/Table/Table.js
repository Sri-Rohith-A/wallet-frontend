import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';
import styles from './TableStyle.module.scss';
import PropTypes from 'prop-types';
import { PREVIOUS, NEXT } from 'constants/Table/table-constants';
import { ASC, DESC, START_DOTS, END_DOTS, NO_DATA_MSG } from 'constants/app-constants';
/**
 * @description function for table component
 * @version 1.0.0
 * @author [Joel]
 */

const TableComponent = ({
  tableRows,
  setCurrentPage,
  data,
  sort,
  column,
  lastPage,
  currentPage,
  handleSort,
  setEmployeeId,
}) => {
  /**
   * @description function to handle page which is called during pagination
   * @version 1.0.0
   * @params pageNumber
   */
  lastPage--;
  const handlePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  /**
   * @description function to render page based on exact page needed for pagination
   * @version 1.0.0
   * @return pageNumbers[]
   */

  const renderPageNumbers = () => {
    let pageNumbers = [];
    let start, end;

    if (lastPage <= 4) {
      start = 0;
      end = lastPage;
    } else if (currentPage <= 2) {
      start = 0;
      end = 4;
    } else if (currentPage >= lastPage - 3) {
      start = lastPage - 5;
      end = lastPage;
    } else {
      start = currentPage - 3;
      end = currentPage + 1;
    }

    if (lastPage > 0 && start > 0) {
      pageNumbers.push(
        <span className={styles['txt-gap']} key={0} onClick={() => handlePage(0)}>
          1{' '}
        </span>,
      );
    }

    if (start > 1) {
      pageNumbers.push(<span key={START_DOTS}> ... </span>);
    }

    for (let i = start; i <= end; i++) {
      if (i === currentPage) {
        pageNumbers.push(
          <span key={i} className={`${styles['selected']} ${styles['txt-gap']}`}>
            {i + 1 + ' '}{' '}
          </span>,
        );
      } else {
        pageNumbers.push(
          <span className={styles['txt-gap']} key={i} onClick={() => handlePage(i)}>
            {i + 1 + ' '}{' '}
          </span>,
        );
      }
    }

    if (end < lastPage - 1) {
      pageNumbers.push(<span key={END_DOTS}> ... </span>);
    }

    if (lastPage > 1 && end < lastPage) {
      pageNumbers.push(
        <span key={lastPage} onClick={() => handlePage(lastPage)}>
          {lastPage + 1}{' '}
        </span>,
      );
    }

    return pageNumbers;
  };

  /**
   * @description function to create table heading when there is no data
   * @version 1.0.0
   */
  const tableHeadNoSort = tableRows.map((row, index) => (
    <th className={styles['table-header']} key={`th${index}`}>
      <span>{row?.name}</span>
    </th>
  ));

  /**
   * @description function to create table columns and heading
   * @version 1.0.0
   */
  let tablehead = tableRows.map((row, index) => (
    <th className={styles['table-header']} key={`th${index}`}>
      <span onClick={() => handleSort(row.property || row.style, sort)}>{row?.name}</span>
      {sort === ASC && column === (row.property || row.style) && (
        <span className={styles['sort-icon']}>
          <AiOutlineArrowUp onClick={() => handleSort(row.property || row.style, sort)} />
        </span>
      )}
      {sort === DESC && column === (row.property || row.style) && (
        <span className={styles['sort-icon']}>
          <AiOutlineArrowDown onClick={() => handleSort(row.property || row.style, sort)} />
        </span>
      )}
    </th>
  ));

  /**
   * @description function to create table data
   * @version 1.0.0
   */
  let tableBody = null;
  if (data.length === 0) {
    tableBody = (
      <tr>
        <td colSpan={tableRows.length} className={styles['no-data-txt']}>
          {NO_DATA_MSG}
        </td>
      </tr>
    );
  }
  if (data.length > 1 && tableRows) {
    tableBody = data.map((row, index) => (
      <tr className={styles['table-row-body']} key={index}>
        {tableRows.map((tableRow, index) => (
          <td className={styles['table-data']} key={index}>
            {tableRow.property ? (
              row[tableRow.property]
            ) : tableRow.href ? (
              <a
                onClick={() => {
                  setEmployeeId(row.id);
                  row[tableRow.href].handler(row[tableRow.href].name);
                }}
              >
                {tableRow.label}
              </a>
            ) : tableRow.style ? (
              <span className={styles[row[tableRow.style].style]}>{row[tableRow.style].label}</span>
            ) : null}
          </td>
        ))}
      </tr>
    ));
  }

  return (
    <>
      {data ? (
        <div>
          <table className={styles['table']}>
            <thead>
              <tr>{data.length === 0 ? tableHeadNoSort : tablehead}</tr>
            </thead>
            <tbody>{tableBody}</tbody>
          </table>
          <div className={styles['pagination']}>
            <button
              className={styles['direction-button']}
              onClick={() => handlePage(currentPage - 1)}
              disabled={currentPage === 0}
            >
              {PREVIOUS}
            </button>
            <div>{renderPageNumbers()}</div>

            <button
              className={styles['direction-button']}
              onClick={() => handlePage(currentPage + 1)}
              disabled={currentPage === lastPage}
            >
              {NEXT}
            </button>
          </div>
        </div>
      ) : (
        []
      )}
    </>
  );
};

TableComponent.propTypes = {
  tableRows: PropTypes.array.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  data: PropTypes.array,
  sort: PropTypes.string.isRequired,
  column: PropTypes.string.isRequired,
  lastPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  handleSort: PropTypes.func.isRequired,
  setEmployeeId: PropTypes.func,
};

export default TableComponent;
