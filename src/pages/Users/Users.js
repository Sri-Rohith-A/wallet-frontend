import TableComponent from '../../containers/Table/Table';
import { IoMdDownload } from 'react-icons/io';
import { TableRows } from '../../constants/Table/table-rows-constants';
import { useEffect, useState } from 'react';
import Button from 'components/Button/Button';
import styles from './Users.module.scss';
import { useUsersData } from 'hooks/useUserData/useUserData';
import { ASC, DESC, AppConstants, STRING, CASH, ID } from 'constants/app-constants';
import UserForm from 'containers/Forms/UserForm/UserForm';

import Title from 'components/Title/Title';
import ContainerLayout from 'layouts/Containers/ContainerLayout';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CurrencyUtil from 'utils/currencyUtil';
import { OverlayModal } from 'components/OverlayModal/OverlayModal';
import { StringHelper } from 'utils/stringHelper';
import TransactionTable from 'containers/TransactionTable/TransactionTable';

const Users = () => {
  const [data, setData] = useState([]);
  const [sort, setSort] = useState(ASC);
  const [column, setColumn] = useState(ID);
  const [lastPage, setLastPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentRows, setCurrentRows] = useState(15);
  const [showModal, setShowModal] = useState(false);
  const [showTransactions, setShowTransactions] = useState(false);
  const [employeeId, setemployeeId] = useState(null);
  const [employeeName, setEmployeeName] = useState('');
  const { TYPES } = AppConstants.USER_FORM;
  const [formType, setFormType] = useState(TYPES.ADD);
  const { USERS_PAGE } = AppConstants;

  //get all users query
  const {
    data: usersData,
    refetch: usersRefetch,
    isLoading: isUsersLoading,
    isSuccess: isUsersSuccess,
  } = useUsersData(currentPage, sort, column, currentRows);

  //handler for manageUser
  const handleManageUser = () => {
    setShowModal(true);
    setFormType(TYPES.MODIFY);
  };

  //handler for user transactions
  const handleTransactions = (name) => {
    setShowTransactions(true);
    setEmployeeName(name);
  };

  useEffect(() => {
    usersRefetch();
  }, [currentPage, sort, column, showModal]);

  useEffect(() => {
    let users = isUsersSuccess ? usersData?.data?.data?.users || [] : [];
    users = users.map((user) => {
      //finding cash types
      const cashTypes = Object.keys(user).filter((key) => {
        return key.includes(CASH);
      });
      //adding rupees symbol to cashtype datas
      for (let key in user) {
        if (cashTypes.includes(key)) {
          if (typeof user[key] !== STRING)
            user[key] = `${CurrencyUtil.indianRupeeSymbol()} ${user[key]}`;
        }
        if (typeof user[key] === STRING) {
          user[key] = StringHelper.capitalizeFirstLettersInText(user[key]);
        }
      }
      user.id = user.employeeId;
      user.transactions = {
        id: user.employeeId,
        handler: handleTransactions,
        name: user.employeeName,
      };
      user.manage = {
        id: user.employeeId,
        handler: handleManageUser,
      };
      return user;
    });
    setData(users);
    setLastPage(isUsersSuccess ? usersData?.data?.data?.totalPages || 1 : 1);
  }, [usersData]);

  /**
   * @description function to handle sort and setting sorting for each column
   * @version 1.0.0
   * @params columnName,sortBy
   */

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

  const handleCloseModal = () => {
    setShowModal(false);
    setShowTransactions(false);
    setemployeeId(null);
  };

  const handleAddUser = () => {
    setShowModal(true);
    setFormType(TYPES.ADD);
  };

  const handleDownload = () => {};
  const handleImportUsers = () => {};

  if (isUsersLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <ContainerLayout>
      <div className={styles['users-panel']}>
        <Title title={USERS_PAGE.TITLE} />
        <div className={styles['buttons-panel']}>
          <Button
            label={USERS_PAGE.BUTTON.DOWNLOAD_XLS}
            size={AppConstants.BUTTON.SIZE.MD}
            color={AppConstants.BUTTON.COLOR.SECONDARY}
            border={AppConstants.BUTTON.SHAPE.ROUND}
            icon={<IoMdDownload fontSize={AppConstants.STYLES.FONT.SIZE.TWENTY_PX} />}
          />
          <Button
            label={USERS_PAGE.BUTTON.IMPORT_USER}
            size={AppConstants.BUTTON.SIZE.S}
            color={AppConstants.BUTTON.COLOR.PRIMARY}
            border={AppConstants.BUTTON.SHAPE.ROUND}
            click={handleImportUsers}
          />
          <Button
            label={USERS_PAGE.BUTTON.ADD_USER}
            size={AppConstants.BUTTON.SIZE.XS}
            color={AppConstants.BUTTON.COLOR.PRIMARY}
            border={AppConstants.BUTTON.SHAPE.ROUND}
            click={handleAddUser}
          />
        </div>
        <div className={styles['users-table']}>
          <TableComponent
            tableRows={TableRows.USERS}
            setCurrentPage={setCurrentPage}
            data={data}
            sort={sort}
            column={column}
            lastPage={lastPage}
            currentPage={currentPage}
            handleSort={handleSort}
            setEmployeeId={setemployeeId}
          />
        </div>

        {showModal && (
          <>
            <OverlayModal showModal={showModal} title={formType} onClose={handleCloseModal}>
              <UserForm
                type={formType}
                showModal={showModal}
                onClose={handleCloseModal}
                toast={toast}
                employeeId={parseInt(employeeId)}
                usersRefetch={usersRefetch}
              />
            </OverlayModal>
          </>
        )}
        <ToastContainer />

        {
          <>
            <TransactionTable
              onClose={handleCloseModal}
              showModal={showTransactions}
              employeeId={employeeId}
              employeeName={employeeName}
            />
          </>
        }
      </div>
    </ContainerLayout>
  );
};
export default Users;
