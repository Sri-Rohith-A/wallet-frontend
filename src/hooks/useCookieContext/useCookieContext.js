import { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import { TOKEN, USER_NAME } from '../../constants/app-constants';
import { StringHelper } from 'utils/stringHelper';

const CookieContext = createContext();
export const useGlobalContext = () => useContext(CookieContext);
export const AppContext = ({ children }) => {
  const [Token, setToken] = useState(Cookies.get(TOKEN) || null);
  const [username, setUsername] = useState(Cookies.get(USER_NAME) || '');
  return (
    <CookieContext.Provider value={{ Token, setToken, username, setUsername }}>
      {children}
    </CookieContext.Provider>
  );
};
AppContext.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
