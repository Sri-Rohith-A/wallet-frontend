import { useForm } from 'react-hook-form';
import style from './LoginForm.module.scss';
import { AppConstants } from '../../../constants/app-constants';
import { ErrorConstants } from '../../../constants/error-constants';
import loginService from '../../../services/LoginService';
import { useState } from 'react';
import Button from '../../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useCookie from '../../../hooks/use-cookie/use-cookie';
import { RouteConstants } from '../../../constants/routes-constants';
import { useGlobalContext } from '../../../hooks/useCookieContext/useCookieContext';
import LabeledInput from '../../../components/LabeledInput/LabeledInput';
import { useMutation } from 'react-query';
/**
 * @description this function is use to enable the the user to login to the application
 * @version 1.0.0
 * @author [Hariboobaalan]
 */
const LoginForm = () => {
  const { DASHBOARD } = RouteConstants;
  const navigate = useNavigate();
  const { Token, setTokenState, setUser } = useCookie();
  const { NAME, PASSWORD, LOGIN_LABEL, FORGOT_PASSWORD_LABEL } = AppConstants.LOGIN_PAGE.USER;
  const { INVALID_USER_MSG, USERNAME_REQUIRED_MSG, PASSWORD_REQUIRED_MSG } = ErrorConstants.ACCOUNT;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    if (Token) {
      navigate(DASHBOARD);
    }
  }, []);
  const mutation = useMutation(loginService, {
    onSuccess: (data) => {
      const {
        status,
        data: {
          data: { adminName, token },
        },
      } = data;
      if (status === 200) {
        setHidden(false);
        setTokenState(token);
        setUser(adminName);
        navigate(DASHBOARD);
      } else {
        setHidden(true);
      }
    },
    onError: () => {
      setHidden(true);
    },
    onSettled: () => {
      reset();
    },
  });
  const onSubmit = (data) => {
    const userCreds = {
      username: data.Username,
      password: data.Password,
    };
    mutation.mutate(userCreds);
  };
  return (
    <>
      {hidden && <div className={style['toastMessage']}>{INVALID_USER_MSG}</div>}
      <form onSubmit={handleSubmit(onSubmit)} className={style['loginForm']}>
        <LabeledInput
          type='text'
          name={NAME}
          register={register(NAME, { required: USERNAME_REQUIRED_MSG })}
          errors={errors}
        />
        <LabeledInput
          type='password'
          name={PASSWORD}
          register={register(PASSWORD, { required: PASSWORD_REQUIRED_MSG })}
          errors={errors}
        />
        <Button color={'primary'} size={'xxl'} label={LOGIN_LABEL} />
        <span className={style['passwordRecovery']}>{FORGOT_PASSWORD_LABEL}</span>
      </form>
    </>
  );
};

export default LoginForm;
