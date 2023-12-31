import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from './const';
import PageMain from '../pages/page-main/page-main';
import Favorites from '../pages/favorites/favorites';
import FavoritesEmpty from '../pages/favorites-empty/favorites-empty';
import PageLogin from '../pages/page-login/page-login';
import Offer from '../pages/offer/offer';
import PageNotFound from '../pages/no-found-page/page-not-found';
import PrivateRoute from './privat-route/privat-route';

const App = (): JSX.Element => (
  <BrowserRouter>
    <Routes>
      <Route path={AppRoute.Main}>
        <Route
          index
          element={<PageMain />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              authorizationStatus={AuthorizationStatus.Auth}
            >
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Login}
          element={<PageLogin />}
        />
        <Route path={AppRoute.Offer} element={<Offer />}>
          <Route path=':idOffer' element={<Offer />} />
        </Route>

        <Route
          path={AppRoute.FavoritesEmpty}
          element={<FavoritesEmpty />}
        />

        <Route
          path='*'
          element={<PageNotFound />}
        />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
