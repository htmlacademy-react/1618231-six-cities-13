import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks/hooks';
import { AuthorizationStatus } from '../../components/const';

const FavoritesEmpty = (): JSX.Element => {
  const authStatus = useAppSelector((state) => state.autorizationStatys);
  const userName = useAppSelector((state) => state.userData.name);
  const favoritesList = useAppSelector((state) => state.favorites);


  return (
    <div className="page page--favorites-empty">
      <Header isAuthorization = {authStatus === AuthorizationStatus.Auth} userName = {userName} offerCount = {favoritesList.length} />
      <main className="page__main page__main--favorites page__main--favorites-empty">
        <div className="page__favorites-container container">
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">Favorites (empty)</h1>
            <div className="favorites__status-wrapper">
              <b className="favorites__status">Nothing yet saved.</b>
              <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
            </div>
          </section>
        </div>
      </main>
      <footer className="footer">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
};

export default FavoritesEmpty;
