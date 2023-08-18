export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
  PageNotFound = '*',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unkhown = 'UNKNOWN',
}

export enum SortTypes {
  Popular = 'Popular',
  LowToHigh = 'Pice: low to high',
  HighToLow = 'Pprice: high to low',
  TopRatedFirst = 'Top rated first',
}

export enum Cities {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

export enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  Nearby = '/nearby',
}

export enum APIActions {
  DataFetchOffers = 'data/fetchOffers',
  DataFetchDetaildOffer = 'data/fetchDetailedOffer',
  DataFetchCommentsOffer = 'data/fetchCommentsOffer',
  DataFetchNearPlaces = 'data/fetchNearPlaces',
  UserCheckAuth = 'user/checkAuth',
  UserLogin = 'user/login',
  UserLogout = 'user/logout',
}

export enum Actions {
  loadOffers = 'offers/load',
  loadNearPlaces = 'nearPlaces/load',
  loadDetailedOffers = 'detailedOffer/load',
  loadCommentsOffer = 'commentsOffer/load',
  citySelection = 'city/selection',
  sortBySelection = 'sortBy/selection',
  setOffersDataLoadingStatus = 'data/loadingStatus',
  userRequireAuthorization = 'user/requireAutorization',
}

export enum RequestStatus {
  Pending = 'pending',
  Idle = 'idle',
  Success = 'success',
  Reject = 'error',
}


export const FIVE_STARS = 5;

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export const BACKEND_URL = 'https://13.design.pages.academy/six-cities';
export const REQUEST_TIMEOUT = 5000;
