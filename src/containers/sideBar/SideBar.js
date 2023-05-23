import styles from './SideBar.module.scss';
import cdwLogo from '../../assets/logo/cdw-white-logo.svg';
import Logo from '../../components/Logo/Logo';
import Menu from '../../components/Menu/Menu';
import Logout from '../../components/Logout/Logout';
import { AppConstants } from '../../constants/app-constants';
/**
 * @description function to return a complete side menu with Logo, navigation links and logout
 * @version 1.0.0
 * @author [Abdul Adhil]
 * @author [Sai Kishore]
 */

const SideBar = () => {
  return (
    <div className={styles['side-bar']}>
      <div className={styles['nav-items']}>
        <Logo src={cdwLogo} alt={AppConstants.LOGO.ALT} />
        <Menu />
      </div>
      <Logout />
    </div>
  );
};

export default SideBar;
