import Header from '../../components/header/header';
import FavoriteList from '../../components/favorite-list/favoriye-list';
import { Link, Navigate } from 'react-router-dom';
import {useAppSelector } from '../../hooks/hooks';
import { AppRoute, AuthorizationStatus } from '../../components/const';

const Favorites = (): JSX.Element => {

  const authStatus = useAppSelector((state) => state.autorizationStatys);
  const favoritesList = useAppSelector((state) => state.favorites);

  return (
    <div className="page">
      {authStatus === AuthorizationStatus.NoAuth && <Navigate to={AppRoute.Main} />}
      {favoritesList.length === 0 && <Navigate to={AppRoute.FavoritesEmpty} />}
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoriteList offers={favoritesList} />
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to="/">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
};

export default Favorites;
