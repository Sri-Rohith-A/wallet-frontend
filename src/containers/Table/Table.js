import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';
import styles from './TableStyle.module.scss';
import PropTypes from 'prop-types';
import { PREVIOUS, NEXT } from 'constants/Table/table-constants';
/**
 * @description function for table component
 * @version 1.0.0
 * @author [Joel]
 */

const TableComponent = ({
  tableColumn,
  tableRows,
  setCurrentPage,
  data,
  sort,
  colum,
  lastPage,
  currentPage,
  handleSort,
}) => {
  /**
   * @description function to handle page which is called during pagination
   * @version 1.0.0
   * @params pageNumber
   */

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
      start = 1;

      end = lastPage - 1;
    } else if (currentPage <= 2) {
      start = 1;

      end = 4;
    } else if (currentPage >= lastPage - 3) {
      start = lastPage - 5;

      end = lastPage - 1;
    } else {
      start = currentPage - 2;

      end = currentPage;
    }

    if (lastPage > 0 && start > 0) {
      pageNumbers.push(
        <span key={0} onClick={() => handlePage(1)}>
          1{' '}
        </span>,
      );
    }

    if (start > 2) {
      pageNumbers.push(<span key='start-dots'> ... </span>);
    }

    for (let i = start; i <= end; i++) {
      if (i === currentPage) {
        pageNumbers.push(
          <span key={i} className={styles['selected']}>
            {i + ' '}{' '}
          </span>,
        );
      } else {
        pageNumbers.push(
          <span key={i} onClick={() => handlePage(i)}>
            {i + ' '}{' '}
          </span>,
        );
      }
    }

    if (end < lastPage - 1) {
      pageNumbers.push(<span key='end-dots'> ... </span>);
    }

    if (lastPage > 1 && end < lastPage) {
      pageNumbers.push(
        <span key={lastPage} onClick={() => handlePage(lastPage)}>
          {lastPage}{' '}
        </span>,
      );
    }

    return pageNumbers;
  };
  /**
   * @description function to create table columns and heading
   * @version 1.0.0
   */
  let tablehead = tableRows.map((row, index) => (
    <>
      <th
        className={styles['table-header']}
        id={row.property}
        onClick={(event) => handleSort(event.target.id, sort)}
      >
        {row.name}{' '}
        {sort === 'asc' && colum === row.property && (
          <span>
            <AiOutlineArrowUp fontSize={'16px'} />{' '}
          </span>
        )}
        {sort === 'desc' && colum === row.property && (
          <span>
            {' '}
            <AiOutlineArrowDown fontSize={'16px'} />
          </span>
        )}
      </th>
    </>
  ));

  /**
   * @description function to create table data
   * @version 1.0.0
   */
  let tableBody = null;
  if (data && tableRows) {
    tableBody = data.map((row, index) => (
      <tr className={styles['table-row-body']} key={index}>
        {tableRows.map((tableRow, index) => (
          <td className={styles['table-data']} key={index}>
            {tableRow.property ? (
              row[tableRow.property]
            ) : (
              <a data-id={row[tableRow.href].id} onClick={row[tableRow.href].handler}>
                {tableRow.label}
              </a>
            )}
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
              <tr>{tablehead}</tr>
            </thead>
            <tbody>{tableBody}</tbody>
          </table>
          <div className={styles['pagination']}>
            <button
              className={styles['direction-button']}
              onClick={() => handlePage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              {PREVIOUS}
            </button>
            <div>{renderPageNumbers()}</div>

            <button
              className={styles['direction-button']}
              onClick={() => handlePage(currentPage + 1)}
              disabled={currentPage + 1 === lastPage}
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
  tableColumn: PropTypes.array.isRequired,
  tableRows: PropTypes.array.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  data: PropTypes.array,
  sort: PropTypes.string.isRequired,
  colum: PropTypes.string.isRequired,
  lastPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  handleSort: PropTypes.func.isRequired,
};

export default TableComponent;
