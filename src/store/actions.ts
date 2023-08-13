import { createAction } from '@reduxjs/toolkit';
import { OfferType } from '../types/offer-type';
import { Actions, AuthorizationStatus, SortTypes } from '../components/const';


export const loadOffers = createAction<OfferType[]>(Actions.loadOffers);
export const citySelection = createAction<string>(Actions.citySelection);
export const sortBySelection = createAction<SortTypes>(Actions.sortBySelection);
export const setOffersDataLoadingStatus = createAction<boolean>(Actions.setOffersDataLoadingStatus);
export const requireAuthorization = createAction<AuthorizationStatus>(Actions.userRequireAuthorization);
