import { OfferType, Nullable } from '../../types/offer-type';
import { Link, Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, FIVE_STARS } from '../const';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { changeFavoriteStatus, fetchFavoritesOffers } from '../../store/api-actions';
import { useState } from 'react';

type PlaceCardProps = {
  data: OfferType;
  setActiveCard?: (offer: Nullable<OfferType>) => void;
}

const PlaceCard = ({ data, setActiveCard }: PlaceCardProps): JSX.Element => {
  const [offer, setOffer] = useState(data);
  const { isPremium, isFavorite, previewImage, rating, title, id, price } = offer;
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state) => state.autorizationStatys);

  const handelBookmarkButton = () => {

    if (authStatus === AuthorizationStatus.Auth) {
      setOffer({ ...offer, isFavorite: !isFavorite });
      const favoriteStatus = {
        idOffer: id,
        status: Number(!isFavorite),
      };
      dispatch(changeFavoriteStatus(favoriteStatus));
      dispatch(fetchFavoritesOffers());

    } else {
      return <Navigate to={AppRoute.Login} />;
    }
  };


  const euro = String.fromCodePoint(0x020AC);

  const offerDetailRef = `${AppRoute.Offer}/${id}`;

  return (
    <article
      className="cities__card place-card"
      onMouseEnter={() => setActiveCard(offer)}
      onMouseLeave={() => setActiveCard(null)}
    >
      {isPremium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div> :
        null}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={offerDetailRef}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">{euro}{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={cn(
            'place-card__bookmark-button button',
            { 'place-card__bookmark-button--active': isFavorite })}
          type="button"
          onClick={handelBookmarkButton}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${rating / FIVE_STARS * 100}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={offerDetailRef}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{data.type}</p>
      </div>
    </article>
  );
};


export default PlaceCard;
