import { createAction } from '@reduxjs/toolkit';
import { OfferType } from '../types/offer-type';
import { SortTypes } from '../components/const';


export const loadOffers = createAction<OfferType[]>('offers/load');
export const citySelection = createAction<string>('city/selection');
export const sortBySelection = createAction<SortTypes>('sortBy/selection');
