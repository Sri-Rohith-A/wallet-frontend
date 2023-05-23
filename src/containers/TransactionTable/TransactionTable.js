import { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { OverlayModal } from 'components/OverlayModal/OverlayModal';
import TableComponent from 'containers/Table/Table';
import { TableRows } from '../../constants/Table/table-rows-constants';
import { ASC, DESC, NUMBER, AppConstants, PLUS_SIGN, MINUS_SIGN } from 'constants/app-constants';
import { useUserTransactions } from 'hooks/useUserData/useUserData';
import styles from './TransactionTable.module.scss';
import CurrencyUtil from 'utils/currencyUtil';
import DateUtil from 'utils/dateFormatter';

/**
 * @description function to return a Transaction table of an user.
 * @version 1.0.0
 * @author [Vishnuraj]
 * @param { employeeId, employeeName, toast, showModal, onClose}
 * @returns User's Trasanctions table
 */

const TransactionTable = ({ employeeId, employeeName, showModal, onClose }) => {
  const { TRANSACTION_STYLES, TRANSACTION_TYPE, TRANSACTION_STATUS } =
    AppConstants.USERS_PAGE.TRANSACTION;
  const [data, setData] = useState([]);
  const [sort, setSort] = useState(ASC);
  const [column, setColumn] = useState(AppConstants.USERS_PAGE.TRANSACTION.TRANSACTION_FIELDS.DATE);
  const [lastPage, setLastPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentRows, setCurrentRows] = useState(15);

  /**
   * @description function to handle sort and setting sorting for each column
   * @version 1.0.0
   * @params columnName,sortBy
   */
  const {
    data: transactionData,
    isSuccess,
    isLoading,
    refetch: transactionsRefetch,
  } = useUserTransactions(currentPage, sort, column, currentRows, employeeId);

  useEffect(() => {
    if (employeeId != null) {
      transactionsRefetch();
    }
  }, [currentPage, isLoading, sort, column, employeeId, showModal, isSuccess]);

  useEffect(() => {
    let empTransactions = transactionData?.data?.data?.transactions || [];
    empTransactions = empTransactions.map((transaction) => {
      if (typeof transaction.amount === NUMBER) {
        transaction.amount = `${
          transaction.transactionType === TRANSACTION_TYPE.CREDIT ? PLUS_SIGN : MINUS_SIGN
        } ${CurrencyUtil.indianRupeeSymbol()} ${transaction.amount}`;
      }
      transaction.date = DateUtil.dateTimeFormatter(transaction.date);

      transaction.status = {
        label: transaction.status,
        style: transaction.status == TRANSACTION_STATUS.COMPLETED ? null : TRANSACTION_STYLES.RED,
      };
      transaction.amount = {
        label: transaction.amount,
        style:
          transaction.transactionType === TRANSACTION_TYPE.CREDIT
            ? TRANSACTION_STYLES.GREEN
            : TRANSACTION_STYLES.RED,
      };
      return transaction;
    });
    setData(empTransactions);

    setLastPage(isSuccess ? transactionData?.data?.data?.totalPages || 1 : 1);
  }, [transactionData]);

  const handleSort = (columnName, sortBy) => {
    if (columnName === '') return;
    if (column !== columnName) {
      setSort(ASC);
    } else {
      sortBy === ASC ? (sortBy = DESC) : (sortBy = ASC);
      setSort(sortBy);
    }
    setColumn(columnName);
  };

  if (isLoading) {
    return <h1>Loading..</h1>;
  }
  return (
    <div className={styles['transactions-table']}>
      {showModal && (
        <OverlayModal
          onClose={onClose}
          title={AppConstants.USERS_PAGE.TRANSACTION.TITLE}
          subTitle={
            <p className={styles['message-txt']}>
              {AppConstants.USERS_PAGE.TRANSACTION.MESSAGE}
              <strong>{` ${employeeName}`}</strong>
            </p>
          }
        >
          <TableComponent
            tableRows={TableRows.USER_TRANSACTIONS}
            setCurrentPage={setCurrentPage}
            data={data}
            sort={sort}
            column={column}
            lastPage={lastPage}
            currentPage={currentPage}
            handleSort={handleSort}
          />
        </OverlayModal>
      )}
    </div>
  );
};

TransactionTable.propTypes = {
  employeeId: PropTypes.number,
  employeeName: PropTypes.string,
  showModal: PropTypes.bool,
  onClose: PropTypes.func,
  toast: PropTypes.func,
};

export default TransactionTable;
