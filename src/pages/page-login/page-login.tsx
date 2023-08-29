import Logo from '../../components/ui/logo/logo';
import MyInput from '../../components/ui/my-input/my-input';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { loginAction } from '../../store/api-actions';
import { AuthData } from '../../types/auth-data';
import { AppRoute, AuthorizationStatus, RequestStatus } from '../../components/const';
import cl from './pagelogin.module.css';
import { Navigate } from 'react-router-dom';
import { setUserName } from '../../store/actions';


const PageLogin = (): JSX.Element => {
  const [userData, setUserData] = useState<AuthData>({ email: '', password: '' });
  const dispatch = useAppDispatch();
  const handleFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(loginAction(userData));
    dispatch(setUserName(userData.email));
  };
  const loginSendStatus = useAppSelector((state) => state.loginSendStatus);
  const loginStatus = useAppSelector((state) => state.autorizationStatys);
  return (
    <div className="page page--gray page--login">
      {loginStatus === AuthorizationStatus.Auth && <Navigate to={AppRoute.Main} />}
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            {loginSendStatus === RequestStatus.Reject &&
              <p className={cl.loginSend}>Все плохо. Сервер не отвечает.<br /> Повторите попытку</p>}
            <h1 className="login__title">Sign in</h1>
            <form onSubmit={(evt) => handleFormSubmit(evt)} className="login__form form" action="#" method="post">
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <MyInput
                  className='login__input form__input'
                  value={userData.email}
                  onChange={(e: { target: { value: string } }) => setUserData({ ...userData, email: e.target.value })}
                  name='email'
                  type='email'
                  placeholder='Email'
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <MyInput
                  className='login__input form__input'
                  value={userData.password}
                  onChange={(e: { target: { value: string } }) => setUserData({ ...userData, password: e.target.value })}
                  name='password'
                  type='text'
                  placeholder='Password'
                  pattern = '(?=.*\d)(?=/*[a-zA-Z]).*'
                  title = 'Пароль должен состоять минимум из одной цифры и буквы'
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default PageLogin;
