import { createReducer } from '@reduxjs/toolkit';
import { loadOffers, citySelection, sortBySelection } from './actions';
import { offerState } from '../types/offer-type';

const initialState: offerState = {
  title: 'Paris',
  offers: [],
  sortBy: 'Popular',
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
});

export { reducer };
