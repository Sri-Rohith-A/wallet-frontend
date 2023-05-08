import Logo from '../../components/Logo/Logo';
import style from './LoginPage.module.scss';
import cdwLogo from '../../assets/logo/cdw-white-logo.svg';
import { AppConstants } from '../../constants/app-constants';
import LoginForm from '../../containers/Forms/LoginForm/LoginForm';
/**
 * @description this function is to render the login page
 * @version 1.0.0
 * @author [Hariboobaalan, Vishnuraj]
 */
const LoginPage = () => {
  const { ALT } = AppConstants.LOGO;
  return (
    <>
      <div className={style['login']}>
        <div className={style['loginModal']}>
          <div className={style['login-section']}>
            <Logo src={cdwLogo} alt={ALT} />
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
