import { AppRoute, AuthorizationStatus } from '../const';
import Logo from '../ui/logo/logo';
import { Link } from 'react-router-dom';
import { logoutAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';


const Header = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const handleSignOutLink = () => {
    dispatch(logoutAction());
  };

  const authStatus = useAppSelector((state) => state.autorizationStatys);
  const favoritesCount = useAppSelector((state) => state.favorites.length);
  const user = useAppSelector((state) => state.userData.email);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {authStatus === AuthorizationStatus.Auth &&
                <li className="header__nav-item user">
                  <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">{user}</span>
                    <span className="header__favorite-count">{favoritesCount}</span>
                  </Link>
                </li>}
              <li className="header__nav-item">
                {authStatus === AuthorizationStatus.Auth ?
                  <Link onClick={handleSignOutLink} className="header__nav-link" to="#">
                    <span className="header__signout">
                      Sign out
                    </span>
                  </Link> :
                  <Link className="header__nav-link" to={AppRoute.Login}>
                    <span className="header__signout">
                      Sign in
                    </span>
                  </Link>}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
