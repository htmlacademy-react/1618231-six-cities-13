import { createReducer } from '@reduxjs/toolkit';
import {
  loadOffers,
  citySelection,
  sortBySelection,
  setOffersDataLoadingStatus,
  requireAuthorization,
  loadDetailedOffer,
  loadCommentsOffer,
  loadNearPlaces,
  setUserComment,
  loadUserData,
  loadFavoritesOffers,
  setFavoritesDataLoadingStatus,
  setFavoriteStatus,
} from './actions';
import { fetchDetailedOfferAction, loginAction } from './api-actions';
import { offerState } from '../types/offer-type';
import { AuthorizationStatus } from '../components/const';
import { RequestStatus } from '../components/const';

const initialState: offerState = {
  autorizationStatys: AuthorizationStatus.Unkhown,
  title: 'Paris',
  offers: [],
  favorites: [],
  nearPlaces: [],
  detailedOffer: {
    id: '',
    title: '',
    type: '',
    price: 0,
    city: {
      name: '',
      location: {
        latitude: 0,
        longitude: 0,
        zoom: 0,
      },
    },
    location: {
      latitude: 0,
      longitude: 0,
      zoom: 0,
    },
    isFavorite: false,
    isPremium: false,
    rating: 0,
    description: '',
    bedrooms: 0,
    goods: [],
    host: {
      name: '',
      avatarUrl: '',
      isPro: false,
    },
    images: [],
    maxAdults: 0,
  },
  comments: [],
  sortBy: 'Popular',
  isOffersDataLoading: false,
  isFavoriteDataLoading: false,
  loginSendStatus: RequestStatus.Idle,
  loadDetailedOfferStatus: RequestStatus.Idle,

  userName: '',
  userData: {
    avatarUrl: '',
    email: '',
    isPro: false,
    name: '',
    token: '',
  },
  comment: {
    id: '',
    comment: '',
    date: '',
    rating: 0,
    user: {
      name: '',
      avatarUrl: '',
      isPro: false,
    },
  },
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadOffers, (state, action) => {
    state.offers = action.payload;
  });

  builder.addCase(loadFavoritesOffers, (state, action) =>{
    state.favorites = action.payload;
  });

  builder.addCase(loadDetailedOffer, (state, action) => {
    state.detailedOffer = action.payload;
  });

  builder.addCase(loadNearPlaces, (state, action) => {
    state.nearPlaces = action.payload;
  });

  builder.addCase(loadCommentsOffer, (state, action) => {
    state.comments = action.payload;
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

  builder.addCase(setFavoritesDataLoadingStatus, (state, action) => {
    state.isFavoriteDataLoading = action.payload;
  });

  builder.addCase(requireAuthorization, (state, action) => {
    state.autorizationStatys = action.payload;
  });

  builder.addCase(loadUserData, (state, action) => {
    state.userData = action.payload;
  });

  builder.addCase(setFavoriteStatus, (state, action) => {
    state.detailedOffer.isFavorite = action.payload;
  });

  builder.addCase(setUserComment, (state, action) => {
    state.comment = action.payload;
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

  builder.addCase(fetchDetailedOfferAction.pending, (state) => {
    state.loadDetailedOfferStatus = RequestStatus.Pending;
  });

  builder.addCase(fetchDetailedOfferAction.fulfilled, (state) => {
    state.loadDetailedOfferStatus = RequestStatus.Success;
  });

  builder.addCase(fetchDetailedOfferAction.rejected, (state) => {
    state.loadDetailedOfferStatus = RequestStatus.Reject;
  });
});

export { reducer };
