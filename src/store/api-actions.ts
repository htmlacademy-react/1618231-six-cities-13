import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import {
  DetailedOfferType,
  OfferType,
  Comment,
  ReviewData,
  FavoriteStatus,
} from '../types/offer-type';
import {
  loadOffers,
  requireAuthorization,
  loadDetailedOffer,
  loadCommentsOffer,
  loadNearPlaces,
  setUserComment,
  loadUserData,
  setFavoritesDataLoadingStatus,
  loadFavoritesOffers,
  setFavoriteStatus,
} from './actions';
import { APIRoute, APIActions, AuthorizationStatus } from '../components/const';
import { AuthData } from '../types/auth-data';
import {AuthUserData } from '../types/user-data';
import { dropToken, saveToken } from '../service/token';

export const fetchOffersAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(APIActions.DataFetchOffers, async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get<OfferType[]>(APIRoute.Offers);
  dispatch(loadOffers(data));
});

export const fetchFavoritesOffers = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(APIActions.DataFetchFavorites, async (_arg, { dispatch, extra: api }) => {
  dispatch(setFavoritesDataLoadingStatus(true));
  const { data } = await api.get<OfferType[]>(APIRoute.Favorite);
  dispatch(setFavoritesDataLoadingStatus(false));
  dispatch(loadFavoritesOffers(data));
});

export const fetchNearPlaces = createAsyncThunk<
  void,
  OfferType['id'],
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(APIActions.DataFetchNearPlaces, async (idOffer, { dispatch, extra: api }) => {
  const { data } = await api.get<OfferType[]>(
    `${APIRoute.Offers}/${idOffer}${APIRoute.Nearby}`
  );
  dispatch(loadNearPlaces(data));
});

export const fetchDetailedOfferAction = createAsyncThunk<
  void,
  OfferType['id'],
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  APIActions.DataFetchDetaildOffer,
  async (idOffer, { dispatch, extra: api }) => {
    const { data } = await api.get<DetailedOfferType>(
      `${APIRoute.Offers}/${idOffer}`
    );
    dispatch(loadDetailedOffer(data));
  }
);

export const fetchCommentsOfferAction = createAsyncThunk<
  void,
  OfferType['id'],
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  APIActions.DataFetchCommentsOffer,
  async (idOffer, { dispatch, extra: api }) => {
    const { data } = await api.get<Comment[]>(
      `${APIRoute.Comments}/${idOffer}`
    );
    dispatch(loadCommentsOffer(data));
  }
);

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(APIActions.UserCheckAuth, async (_arg, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<AuthUserData>(APIRoute.Login);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(loadUserData(data));
  } catch {
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
});

export const loginAction = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(APIActions.UserLogin, async (loginData, { dispatch, extra: api }) => {
  const {data} = await api.post<AuthUserData>(APIRoute.Login, loginData);
  saveToken(data.token);
  dispatch(loadUserData(data));
  dispatch(requireAuthorization(AuthorizationStatus.Auth));
});

export const commentAction = createAsyncThunk<
  void,
  ReviewData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(APIActions.UserSetComment, async (reviewData, { dispatch, extra: api }) => {
  const { data } = await api.post<Comment>(
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    `${APIRoute.Comments}/${reviewData.idOffer}`,
    reviewData.review
  );
  dispatch(setUserComment(data));
});

export const changeFavoriteStatus = createAsyncThunk<
  void,
  FavoriteStatus,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  APIActions.OfferFavoriteStatus,
  async (favoriteStatus, { dispatch, extra: api }) => {
    const { data } = await api.post<DetailedOfferType>(
      `${APIRoute.Favorite}/${favoriteStatus.idOffer}/${favoriteStatus.status}`
    );
    dispatch(setFavoriteStatus(data.isFavorite));
  }
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(APIActions.UserLogout, async (_arg, { dispatch, extra: api }) => {
  await api.delete(APIRoute.Logout);
  dropToken();
  dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
});
