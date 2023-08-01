import { createReducer } from '@reduxjs/toolkit';
import { loadOffers, citySelection } from './actions';
import { offerState } from '../types/offer-type';

const initialState: offerState = {
  title: 'Paris',
  offers: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadOffers, (state, action) => {
    state.offers = action.payload;
  });

  builder.addCase(citySelection, (state, action) => {
    state.title = action.payload;
  });
});

export { reducer };
