import TableComponent from '../../containers/Table/Table';
import { IoMdDownload } from 'react-icons/io';
import { TableColumn } from '../../constants/Table/table-column-constants';
import { TableRows } from '../../constants/Table/table-rows-constants';
import { useEffect, useState } from 'react';
import Button from 'components/Button/Button';
import styles from './Users.module.scss';
import { useUserData, useUsersData } from 'hooks/useUserData/useUserData';
import UserForm from 'containers/userForm/UserForm';
import { ASC, DESC, AppConstants } from 'constants/app-constants';
import Title from 'components/Title/Title';
import ContainerLayout from 'layouts/Containers/ContainerLayout';
const Users = () => {
  const [data, setData] = useState([]);
  const [sort, setSort] = useState('asc');
  const [colum, setColumn] = useState('employeeId');
  const [lastPage, setTotalPages] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [current, set] = useState(15);
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isUserAdded, setIsUserAdded] = useState(false);
  const { TYPES } = AppConstants.USER_FORM;
  const [formType, setFormType] = useState(TYPES.ADD);
  const { USERS_PAGE } = AppConstants;

  //get single user query
  const { data: userData, refetch: userRefetch } = useUserData(userId);

  //get all users query
  const {
    data: usersData,
    refetch: usersRefetch,
    isLoading: isUsersLoading,
  } = useUsersData(currentPage, sort, colum, current);

  //handler for manageUser
  const handleManageUser = (e) => {
    setUserId(e.target.dataset.id);
    userRefetch();
    setShowModal(true);
    setFormType(TYPES.MODIFY);
  };

  //handler for user transactions
  const handleTransactions = (e) => {};

  useEffect(() => {
    usersRefetch();
    let users = usersData?.data?.data?.users || [];
    users = users.map((user) => {
      user.transactions = {
        id: user.employeeId,
        handler: handleTransactions,
      };
      user.manage = {
        id: user.employeeId,
        handler: handleManageUser,
      };
      return user;
    });
    setData(users);
    setTotalPages(userData?.data?.totalPages);
  }, [currentPage, sort, colum, isUserAdded, isUsersLoading]);

  if (isUsersLoading) {
    return <h1>Loading...</h1>;
  }

  /**
   * @description function to handle sort and setting sorting for each column
   * @version 1.0.0
   * @params columnName,sortBy
   */

  const handleSort = (columnName, sortBy) => {
    sortBy === ASC ? (sortBy = DESC) : (sortBy = ASC);
    setSort(sortBy);
    setColumn(columnName);
    console.log(colum, sort);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddUser = () => {
    setShowModal(true);
    setFormType(TYPES.ADD);
  };

  const handleDownload = () => {};
  const handleImportUsers = () => {};

  console.log(usersData?.data?.data?.users);

  return (
    <ContainerLayout>
      <div className={styles['users-panel']}>
        <Title title={USERS_PAGE.TITLE} />
        <div className={styles['buttons-panel']}>
          <Button
            label={USERS_PAGE.BUTTON.DOWNLOAD_XLS}
            size={AppConstants.BUTTON.BUTTON_SIZE_MD}
            color={AppConstants.BUTTON.BUTTON_COLOR_SECONDARY}
            border={AppConstants.BUTTON.BUTTON_SHAPE_ROUND}
            icon={<IoMdDownload fontSize='20px' click={handleDownload} />}
          />
          <Button
            label={USERS_PAGE.BUTTON.IMPORT_USER}
            size={AppConstants.BUTTON.BUTTON_SIZE_S}
            color={AppConstants.BUTTON.BUTTON_COLOR_PRIMARY}
            border={AppConstants.BUTTON.BUTTON_SHAPE_ROUND}
            click={handleImportUsers}
          />
          <Button
            label={USERS_PAGE.BUTTON.ADD_USER}
            size={AppConstants.BUTTON.BUTTON_SIZE_XS}
            color={AppConstants.BUTTON.BUTTON_COLOR_PRIMARY}
            border={AppConstants.BUTTON.BUTTON_SHAPE_ROUND}
            click={handleAddUser}
          />
        </div>
        <TableComponent
          className={styles['users-table']}
          tableColumn={TableColumn.ADD_USERS}
          tableRows={TableRows.ADD_USERS}
          setCurrentPage={setCurrentPage}
          data={data}
          sort={sort}
          colum={colum}
          lastPage={lastPage}
          currentPage={currentPage}
          handleSort={handleSort}
        />

        {
          <UserForm
            type={formType}
            data={usersData?.data?.data}
            showModal={showModal}
            onClose={handleCloseModal}
            setIsUserAdded={setIsUserAdded}
          />
        }
      </div>
    </ContainerLayout>
  );
};
export default Users;
