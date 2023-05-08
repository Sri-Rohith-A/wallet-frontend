import React, { lazy, Suspense } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { RouteConstants } from '../../constants/routes-constants';
import SideBar from '../../containers/sideBar/SideBar';
import styles from './ProtectedRoutes.module.scss';
import { useGlobalContext } from '../../hooks/useCookieContext/useCookieContext';
import Logo from 'components/Logo/Logo';
import logo from '../../assets/logo/cdw-white-logo.svg';
/**
 * @description this function is use to render the pages only after the user is logedin
 * @version 1.0.0
 * @author [Rakhesh Bowtham]
 * @author [Battepati Lokesh Reddy]
 */
const ProtectedRoute = () => {
  const { LOGIN } = RouteConstants;
  const { Token } = useGlobalContext();
  return Token ? (
    <>
      <div className={styles['root-layout']}>
        <SideBar />
        <Suspense
          fallback={
            <div className={styles['logo-wrapper']}>
              <div className={styles['logo-container']}>
                <Logo src={logo} alt={'cdw logo'} />
              </div>
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </div>
    </>
  ) : (
    <Navigate to={LOGIN} replace />
  );
};

export default ProtectedRoute;
