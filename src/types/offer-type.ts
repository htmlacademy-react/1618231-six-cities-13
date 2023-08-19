export type OfferType = {
  id: string;
  title: string | null;
  type: string;
  price: number;
  previewImage: string;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
};

export type DetailedOfferType = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: string[];
  host: Host;
  images: string[];
  maxAdults: number;
};

export type offerState = {
  autorizationStatys: string;
  title: string | undefined;
  offers: OfferType[];
  nearPlaces: OfferType[];
  comments: Comment[];
  detailedOffer: DetailedOfferType;
  sortBy: string;
  isOffersDataLoading: boolean;
  loginSendStatus: string;
  loadDetailedOfferStatus: string;
  userName: string;
  comment: Comment;
};

export type Host = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type City = {
  name: string;
  location: Location;
};

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type OfferCommentType = {
  idOffer: string;
  comments: Comment[];
};

export type Comment = {
  id: string;
  comment: string;
  date: string;
  rating: number;
  user: User;
};

export type ReviewData = {
  idOffer: string | undefined;
  review: {
      comment: string;
      rating: number;
  };
}
export type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type Reviews = {
  id: string;
  date: string;
  user: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  comment: string;
  rating: number;
};

export type Nullable<T> = T | null;
