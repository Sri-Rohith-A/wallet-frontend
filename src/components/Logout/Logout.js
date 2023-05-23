import styles from './Logout.module.scss';
import useCookie from '../../hooks/use-cookie/use-cookie';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import { ProtectedRouteConstants } from '../../constants/route-constants';
import { useGlobalContext } from '../../hooks/useCookieContext/useCookieContext';
import { BsArrowRightCircle } from 'react-icons/bs';
import { AppConstants, LOGOUT } from '../../constants/app-constants';
import App from 'App';
/**
 * @description function to return the loged in user and logout button
 * @version 1.0.0
 * @author [Abdul Adhil]
 * @returns Logout
 */

const Logout = () => {
  const { clearToken } = useCookie();
  const { setToken, username, setUsername } = useGlobalContext();
  const navigate = useNavigate();
  const { LOGIN } = ProtectedRouteConstants;
  const handleLogout = () => {
    clearToken();
    setToken(null);
    setUsername('');
    navigate(LOGIN.path);
    const bc = new BroadcastChannel(LOGOUT);
    bc.postMessage(LOGOUT);
    bc.close();
  };
  return (
    <div className={styles['logout']}>
      <span>{username}</span>
      <Button
        label={AppConstants.LOGOUT_PAGE.LOGOUT_LABEL}
        color={AppConstants.BUTTON.COLOR.TRANSPARENT}
        border={AppConstants.BUTTON.BORDER.NONE}
        icon={<BsArrowRightCircle />}
        click={handleLogout}
      />
    </div>
  );
};

export default Logout;
