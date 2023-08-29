import { Navigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CommentForm from '../../components/comment-form/comment-form';
import Header from '../../components/header/header';
import OfferGallery from '../../components/offer-gallery/offer-gallery';
import { FIVE_STARS, RequestStatus, AuthorizationStatus, AppRoute, COUNT } from '../../components/const';
import OfferInsideList from '../../components/offer-inside-list/offer-inside-list';
import ReviewList from '../../components/review-list/review-list';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchDetailedOfferAction, fetchCommentsOfferAction, fetchNearPlaces, changeFavoriteStatus, fetchFavoritesOffers } from '../../store/api-actions';
import LoadScreen from '../load-screen/load-screen';
import NearPlaces from '../../components/near-places/near-places';
import { Location } from '../../types/offer-type';
import Map from '../../components/map/map';
import cn from 'classnames';


const Offer = (): JSX.Element => {
  const { idOffer } = useParams();
  const dispatch = useAppDispatch();
  const detailedOffer = useAppSelector((state) => state.detailedOffer);
  const commentsOffer = useAppSelector((state) => state.comments);
  const loadDetailedOfferStatus = useAppSelector((state) => state.loadDetailedOfferStatus);
  const auchStatus = useAppSelector((state) => state.autorizationStatys);
  const loadOfferStatus = useAppSelector((state) => state.loadDetailedOfferStatus);
  const euro = String.fromCodePoint(0x020AC);
  const nearPlaces = useAppSelector((state) => state.nearPlaces);
  const centerLocation: Location = nearPlaces[0] ? nearPlaces[0].city.location : { latitude: 0, longitude: 0, zoom: 0 };
  const authStatus = useAppSelector((state) => state.autorizationStatys);

  useEffect(() => {
    if (idOffer) {
      dispatch(fetchDetailedOfferAction(idOffer));
      dispatch(fetchCommentsOfferAction(idOffer));
      dispatch(fetchNearPlaces(idOffer));
    }
  }, [dispatch, idOffer]);

  const [offer, setOffer] = useState(detailedOffer);
  const { title, isPremium, rating, type, bedrooms, maxAdults, price, goods, host, description, isFavorite, id } = offer;


  const start = Math.floor(Math.random() * (nearPlaces.length - COUNT));
  const end = start + COUNT;
  const randomNearPlaces = nearPlaces.length ? nearPlaces.slice(start, end) : [];

  const handelBookmarkButton = () => {
    if (authStatus === AuthorizationStatus.Auth) {
      setOffer({ ...offer, isFavorite: !isFavorite });
      const favoriteStatus = {
        idOffer: id,
        status: Number(!isFavorite)
      };
      dispatch(changeFavoriteStatus(favoriteStatus))
        .then(() => dispatch(fetchFavoritesOffers()));
    }
  };

  return (
    <div className="page">
      <Header />
      {loadDetailedOfferStatus === RequestStatus.Pending && (
        <LoadScreen />
      )}
      {loadOfferStatus === RequestStatus.Reject && <Navigate to={`/${AppRoute.PageNotFound}`} />}
      {loadDetailedOfferStatus === RequestStatus.Success && offer && (
        <main className="page__main page__main--offer">
          <section className="offer">
            {offer && <OfferGallery offer={offer} />}
            <div className="offer__container container">
              <div className="offer__wrapper">
                {isPremium &&
                  <div className="offer__mark">
                    <span>Premium</span>
                  </div>}
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">
                    {title}
                  </h1>
                  <button className={cn('offer__bookmark-button button',
                    { 'offer__bookmark-button--active': isFavorite }
                  )}
                  type="button"
                  onClick={handelBookmarkButton}
                  >
                    <svg className="offer__bookmark-icon" width="31" height="33">
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span style={{ width: `${rating / FIVE_STARS * 100}%` }}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">{rating}</span>
                </div>
                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">
                    {type}
                  </li>
                  <li className="offer__feature offer__feature--bedrooms">
                    {bedrooms} Bedrooms
                  </li>
                  <li className="offer__feature offer__feature--adults">
                    Max {maxAdults} adults
                  </li>
                </ul>
                <div className="offer__price">
                  <b className="offer__price-value">{euro}{price}</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What s inside</h2>
                  <OfferInsideList features={goods} />
                </div>
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                      <img className="offer__avatar user__avatar" src={host.avatarUrl} alt="Host avatar" width="74" height="74" />
                    </div>
                    <span className="offer__user-name">
                      {host.name}
                    </span>
                    {host.isPro &&
                      <span className="offer__user-status">
                        Pro
                      </span>}
                  </div>
                  <div className="offer__description">
                    <p className="offer__text">
                      {description}
                    </p>
                    <p className="offer__text">
                    </p>
                  </div>
                </div>
                <section className="offer__reviews reviews">
                  <h2 className="reviews__title">Reviews · <span className="reviews__amount">{commentsOffer?.length}</span></h2>
                  {commentsOffer.length && <ReviewList reviewsOffer={commentsOffer} />}
                  {auchStatus === AuthorizationStatus.Auth && <CommentForm idOffer={idOffer} />}

                </section>
              </div>
            </div>
            <section className="offer__map map">
              {randomNearPlaces.length &&
                <Map currentOffers={randomNearPlaces} center={centerLocation} detailedOffer={detailedOffer} />}
              {!randomNearPlaces.length &&
                <section className="offer__map map"></section>}
            </section>
          </section>
          <div className="container">
            {randomNearPlaces.length && <NearPlaces nearPlaces={randomNearPlaces} />}
            {!randomNearPlaces.length && <h2 className="near-places__title">No places to stay available</h2>}
          </div>
        </main>
      )}
    </div>
  );
};

export default Offer;
