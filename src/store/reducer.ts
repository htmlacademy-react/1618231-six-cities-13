import { createReducer } from '@reduxjs/toolkit';
import { loadOffers, citySelection, sortBySelection, setOffersDataLoadingStatus, requireAuthorization } from './actions';
import { loginAction } from './api-actions';
import { offerState } from '../types/offer-type';
import { AuthorizationStatus } from '../components/const';
import { RequestStatus } from '../components/const';

const initialState: offerState = {
  title: 'Paris',
  offers: [],
  sortBy: 'Popular',
  isOffersDataLoading: false,
  autorizationStatys: AuthorizationStatus.Unkhown,
  loginSendStatus: RequestStatus.Idle
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadOffers, (state, action) => {
    state.offers = action.payload;
  });

  builder.addCase(citySelection, (state, action) => {
    state.title = action.payload;
  });

  builder.addCase(sortBySelection, (state, action) => {
    state.sortBy = action.payload;
  });

  builder.addCase(setOffersDataLoadingStatus, (state, action) => {
    state.isOffersDataLoading = action.payload;
  });

  builder.addCase(requireAuthorization, (state, action) => {
    state.autorizationStatys = action.payload;
  });

  builder.addCase(loginAction.pending, (state) => {
    state.loginSendStatus = RequestStatus.Pending;
  });

  builder.addCase(loginAction.fulfilled, (state) => {
    state.loginSendStatus = RequestStatus.Success;
  });

  builder.addCase(loginAction.rejected, (state) => {
    state.loginSendStatus = RequestStatus.Reject;
  });

});

export { reducer };
