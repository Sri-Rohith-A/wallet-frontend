import styles from './Logout.module.scss';
import useCookie from '../../hooks/use-cookie/use-cookie';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';
import { RouteConstants } from '../../constants/routes-constants';
import { useGlobalContext } from '../../hooks/useCookieContext/useCookieContext';
import { BsArrowRightCircle } from 'react-icons/bs';
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
  const { LOGIN } = RouteConstants;
  const handleLogout = () => {
    clearToken();
    setToken(null);
    setUsername('');
    navigate(LOGIN);
  };
  return (
    <div className={styles['logout']}>
      <span>{username}</span>
      <Button
        label={'Logout'}
        color={'transparent'}
        border={'none'}
        icon={<BsArrowRightCircle />}
        click={handleLogout}
      />
    </div>
  );
};

export default Logout;
