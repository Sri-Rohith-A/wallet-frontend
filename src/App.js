import { QueryClientProvider, QueryClient } from 'react-query';
import { LOGOUT, MESSAGE } from './constants/app-constants';
import { ProtectedRouteConstants } from './constants/route-constants';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { AppContext } from './hooks/useCookieContext/useCookieContext';
import './styles/scss/global.module.scss';
import LoginPage from './pages/login/LoginPage';
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const ConfigsPage = lazy(() => import('./pages/configs/ConfigsPage'));
const Events = lazy(() => import('./pages/events/Events'));
const Users = lazy(() => import('./pages/Users/Users'));
const AddMoney = lazy(() => import('./pages/AddMoney/AddMoney'));
const Reports = lazy(() => import('pages/Reports/Reports'));

const App = () => {
  const { HOME, LOGIN, REPORTS, DASHBOARD, STATS, USERS, ADD_MONEY, EVENTS, CONFIGS } =
    ProtectedRouteConstants;
  const queryClient = new QueryClient();
  useEffect(() => {
    const handleLogout = () => {
      window.location.reload();
    };

    const bc = new BroadcastChannel(LOGOUT);
    bc.addEventListener(MESSAGE, handleLogout);

    return () => {
      bc.removeEventListener(MESSAGE, handleLogout);
      bc.close();
    };
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <AppContext>
        <BrowserRouter>
          <Routes>
            <Route path={LOGIN.path} element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path={HOME.path} element={<Navigate to={DASHBOARD.path} replace />} />
              <Route path={DASHBOARD.path} element={<Dashboard />} />
              <Route path={REPORTS.path} element={<Reports />} />
              {/* <Route path={STATS} element={<Stats />} /> */}
              <Route path={USERS.path} element={<Users />} />
              <Route path={ADD_MONEY.path} element={<AddMoney />} />
              <Route path={EVENTS.path} element={<Events />} />
              <Route path={CONFIGS.path} element={<ConfigsPage />} />
            </Route>
            <Route path='*' element={<Navigate to={HOME.path} replace />}></Route>
          </Routes>
        </BrowserRouter>
      </AppContext>
    </QueryClientProvider>
  );
};

export default App;
