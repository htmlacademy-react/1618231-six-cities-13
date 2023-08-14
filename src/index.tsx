import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import { offers } from './mocks/offers';
import { Provider } from 'react-redux';
import { store } from './store';
import { fetchOffersAction, checkAuthAction } from './store/api-actions';

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App offersList={offers} />
    </Provider>
  </React.StrictMode>
);
