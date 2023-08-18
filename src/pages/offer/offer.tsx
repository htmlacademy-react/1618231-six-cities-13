import {useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import { DetailedOfferType } from '../../types/offer-type';
import CommentForm from '../../components/comment-form/comment-form';
import Header from '../../components/header/header';
import OfferGallery from '../../components/offer-gallery/offer-gallery';
import { FIVE_STARS, RequestStatus, AuthorizationStatus } from '../../components/const';
import OfferInsideList from '../../components/offer-inside-list/offer-inside-list';
import ReviewList from '../../components/review-list/review-list';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchDetailedOfferAction, fetchCommentsOfferAction } from '../../store/api-actions';
import LoadScreen from '../load-screen/load-screen';
import NearPlaces from '../../components/near-places/near-places';
import {Nullable, OfferType, Location } from '../../types/offer-type';
import Map from '../../components/map/map';


const Offer = (): JSX.Element => {
  const { idOffer } = useParams();
  const dispatch = useAppDispatch();
  const [activeCard, setActiveCard] = useState<Nullable<OfferType>>(null);
  const nearPlaces = useAppSelector((state) => state.nearPlaces);
  const centerLocation : Location = nearPlaces ? nearPlaces[0].city.location : {latitude: 0, longitude: 0, zoom: 0};

  useEffect(() => {
    if (idOffer) {
      dispatch(fetchDetailedOfferAction(idOffer));
      dispatch(fetchCommentsOfferAction(idOffer));
    }
  }, [dispatch, idOffer]);

  const detailedOffer = useAppSelector((state) => state.detailedOffer);
  const commentsOffer = useAppSelector((state) => state.comments);
  const loadDetailedOfferStatus = useAppSelector((state) => state.loadDetailedOfferStatus);
  const auchStatus = useAppSelector((state) => state.autorizationStatys);
  const euro = String.fromCodePoint(0x020AC);
  const { title, isPremium, rating, type, bedrooms, maxAdults, price, goods, host, description } = detailedOffer;


  return (
    <div className="page">
      <Header isAuthorization />
      {loadDetailedOfferStatus === RequestStatus.Pending && (
        <LoadScreen />
      )}
      {loadDetailedOfferStatus === RequestStatus.Success && detailedOffer && (
        <main className="page__main page__main--offer">
          <section className="offer">
            {detailedOffer && <OfferGallery offer={detailedOffer} />}
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
                  <button className="offer__bookmark-button button" type="button">
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
                  {commentsOffer && <ReviewList reviewsOffer={commentsOffer} />}
                  {auchStatus === AuthorizationStatus.Auth && <CommentForm />}

                </section>
              </div>
            </div>
            <section className="offer__map map">
              <Map currentOffers = {nearPlaces} center = {centerLocation} activeCardId={activeCard?.id} />
            </section>
          </section>
          <div className="container">
            <NearPlaces idOffer={idOffer} setActiveCard = {setActiveCard} />
          </div>
        </main>
      )}
    </div>
  );
};

export default Offer;
