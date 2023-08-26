export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  FavoritesEmpty = '/favorites-empty',
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
  Favorite = '/favorite',
}

export enum APIActions {
  DataFetchOffers = 'data/fetchOffers',
  DataFetchFavorites = 'data/fetchFavorites',
  DataFetchDetaildOffer = 'data/fetchDetailedOffer',
  DataFetchCommentsOffer = 'data/fetchCommentsOffer',
  DataFetchNearPlaces = 'data/fetchNearPlaces',
  UserCheckAuth = 'user/checkAuth',
  UserLogin = 'user/login',
  UserLogout = 'user/logout',
  UserSetComment = 'user/setComment',
  OfferFavoriteStatus = 'offer/favoriteStatus',
}

export enum Actions {
  loadOffers = 'offers/load',
  loadNearPlaces = 'nearPlaces/load',
  loadDetailedOffers = 'detailedOffer/load',
  loadCommentsOffer = 'commentsOffer/load',
  loadFavoritesOffers = 'favoritesOffers/load',
  loadUserData = 'userData/load',
  citySelection = 'city/selection',
  sortBySelection = 'sortBy/selection',
  setOffersDataLoadingStatus = 'data/loadingStatus',
  setFavoritesDataLoadingStatus = 'data/favoritesLoadingStatus',
  userRequireAuthorization = 'user/requireAutorization',
  setUserName = 'user/setName',
  setUserComment = 'user/setUserComment',
  setFavoriteOfferStatus = 'data/favoriteOfferStatus',
}

export enum RequestStatus {
  Pending = 'pending',
  Idle = 'idle',
  Success = 'success',
  Reject = 'error',
}

export enum Rating {
  oneStar = '1',
  twoStars = '2',
  threeStars = '3',
  fourStars = '4',
  fiveStars = '5',
}


export const FIVE_STARS = 5;
export const magicNumbers = {
  zero: 0,
  min: 50,
  max: 300
};

export const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export const BACKEND_URL = 'https://13.design.pages.academy/six-cities';
export const REQUEST_TIMEOUT = 5000;
