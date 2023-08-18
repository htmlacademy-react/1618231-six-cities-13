import { createAction } from '@reduxjs/toolkit';
import { DetailedOfferType, OfferType, Comment } from '../types/offer-type';
import { Actions, AuthorizationStatus, SortTypes } from '../components/const';


export const loadOffers = createAction<OfferType[]>(Actions.loadOffers);
export const citySelection = createAction<string>(Actions.citySelection);
export const sortBySelection = createAction<SortTypes>(Actions.sortBySelection);
export const setOffersDataLoadingStatus = createAction<boolean>(Actions.setOffersDataLoadingStatus);
export const requireAuthorization = createAction<AuthorizationStatus>(Actions.userRequireAuthorization);
export const loadDetailedOffer = createAction<DetailedOfferType>(Actions.loadDetailedOffers);
export const loadCommentsOffer = createAction<Comment[]>(Actions.loadCommentsOffer);
export const loadNearPlaces = createAction<OfferType[]>(Actions.loadNearPlaces);
