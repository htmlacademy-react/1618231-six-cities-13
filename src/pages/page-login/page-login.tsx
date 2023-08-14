import Logo from '../../components/ui/logo/logo';
import MyInput from '../../components/ui/my-input/my-input';
import { useState} from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { loginAction } from '../../store/api-actions';
import { AuthData } from '../../types/auth-data';
import { RequestStatus } from '../../components/const';
import cl from './pagelogin.module.css';


const PageLogin = (): JSX.Element => {
  const [userData, setUserData] = useState<AuthData>({ email: '', password: '' });
  const dispatch = useAppDispatch();
  const handleFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(loginAction(userData));
  };
  const loginSendStatus = useAppSelector((state) => state.loginSendStatus);

  return (
    <div className="page page--gray page--login">
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
            <p className = {cl.loginSend}>Все плохо. Сервер не отвечает.<br/> Повторите попытку</p>}
            <h1 className="login__title">Sign in</h1>
            <form onSubmit = {(evt) => handleFormSubmit(evt)} className="login__form form" action="#" method="post">
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <MyInput
                  value={userData.email}
                  onChange={(e: {target: {value : string}}) => setUserData({...userData, email: e.target.value})}
                  name='email'
                  type='emeil'
                  placeholder='Email'
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <MyInput
                  value={userData.password}
                  onChange = {(e: { target: { value: string }}) => setUserData({...userData, password: e.target.value})}
                  name='password'
                  type='text'
                  placeholder='Password'
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
