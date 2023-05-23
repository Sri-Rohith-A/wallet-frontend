import Cookies from 'js-cookie';
import { useGlobalContext } from '../useCookieContext/useCookieContext';
import { TOKEN, USER_NAME, TOKEN_EXPIRY_DURATION } from '../../constants/app-constants';

const useCookie = () => {
  const { Token, setToken, setUsername } = useGlobalContext();
  const setTokenState = (token) => {
    Cookies.set(TOKEN, token, { expires: TOKEN_EXPIRY_DURATION });
    setToken(token);
  };
  const clearToken = () => {
    Cookies.remove(TOKEN);
    Cookies.remove(USER_NAME);
  };
  const setUser = (username) => {
    Cookies.set(USER_NAME, username, { expires: TOKEN_EXPIRY_DURATION });
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
