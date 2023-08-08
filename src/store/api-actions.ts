import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { OfferType } from '../types/offer-type';
import { loadOffers, setOffersDataLoadingStatus } from './actions';

export const fetchOffersAction = createAsyncThunk< void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersDataLoadingStatus(true));
    const {data} = await api.get<OfferType[]>('/offers');
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(loadOffers(data));
  },
);
