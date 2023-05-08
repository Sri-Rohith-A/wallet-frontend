import Cookies from 'js-cookie';
import { useGlobalContext } from '../useCookieContext/useCookieContext';

const useCookie = () => {
  const { Token, setToken, setUsername } = useGlobalContext();
  const setTokenState = (token) => {
    Cookies.set('token', token, { expires: 1 / 24 });
    setToken(token);
  };
  const clearToken = () => {
    Cookies.remove('token');
    Cookies.remove('username');
  };
  const setUser = (username) => {
    Cookies.set('username', username, { expires: 1 / 24 });
    setUsername(username);
  };
  return {
    setTokenState,
    clearToken,
    setUser,
    Token,
  };
};
export default useCookie;
