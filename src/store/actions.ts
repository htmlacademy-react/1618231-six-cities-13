import { createAction } from '@reduxjs/toolkit';
import { DetailedOfferType, OfferType, Comment } from '../types/offer-type';
import { Actions, AuthorizationStatus, SortTypes } from '../components/const';
import { AuthUserData } from '../types/user-data';


export const loadOffers = createAction<OfferType[]>(Actions.loadOffers);
export const citySelection = createAction<string>(Actions.citySelection);
export const sortBySelection = createAction<SortTypes>(Actions.sortBySelection);
export const setOffersDataLoadingStatus = createAction<boolean>(Actions.setOffersDataLoadingStatus);
export const setFavoritesDataLoadingStatus = createAction<boolean>(Actions.setFavoritesDataLoadingStatus);
export const requireAuthorization = createAction<AuthorizationStatus>(Actions.userRequireAuthorization);
export const loadDetailedOffer = createAction<DetailedOfferType>(Actions.loadDetailedOffers);
export const loadFavoritesOffers = createAction<OfferType[]>(Actions.loadFavoritesOffers);
export const loadCommentsOffer = createAction<Comment[]>(Actions.loadCommentsOffer);
export const loadNearPlaces = createAction<OfferType[]>(Actions.loadNearPlaces);
export const loadUserData = createAction<AuthUserData>(Actions.loadUserData);
export const setUserName = createAction<string>(Actions.setUserName);
export const setUserComment = createAction<Comment>(Actions.setUserComment);
export const setFavoriteStatus = createAction<boolean>(Actions.setFavoriteOfferStatus);
