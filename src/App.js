import { QueryClientProvider, QueryClient } from 'react-query';
import { RouteConstants } from './constants/routes-constants';
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
const App = () => {
  const { HOME, LOGIN, REPORTS, DASHBOARD, STATS, USERS, ADD_MONEY, EVENTS, CONFIGS } =
    RouteConstants;
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AppContext>
        <BrowserRouter>
          <Routes>
            <Route path={LOGIN} element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path={HOME} element={<Navigate to={DASHBOARD} replace />} />
              <Route path={DASHBOARD} element={<Dashboard />} />
              {/* <Route path={REPORTS} element={<Reports />} /> */}
              {/* <Route path={STATS} element={<Stats />} /> */}
              <Route path={USERS} element={<Users />} />
              {/* <Route path={ADD_MONEY} element={<Addmpney />} /> */}
              <Route path={EVENTS} element={<Events />} />
              <Route path={CONFIGS} element={<ConfigsPage />} />
            </Route>
            <Route path='*' element={<Navigate to='/' replace />}></Route>
          </Routes>
        </BrowserRouter>
      </AppContext>
    </QueryClientProvider>
  );
};

export default App;
