import { createAction } from '@reduxjs/toolkit';
import { OfferType } from '../types/offer-type';


export const loadOffers = createAction<OfferType[]>('offers/load');
export const citySelection = createAction<string>('city/selection');
