import { Link } from 'react-router-dom';
import { OfferType } from '../../types/offer-type';
import { useState } from 'react';
import { FIVE_STARS, AuthorizationStatus, AppRoute } from '../const';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { changeFavoriteStatus, fetchFavoritesOffers } from '../../store/api-actions';

type FavoriteItemProps = {
  data: OfferType;
}
const FavoriteCard = ({ data }: FavoriteItemProps): JSX.Element => {

  const [card, setCard] = useState(data);
  const { isPremium, isFavorite, previewImage, rating, title, id, price, type } = card;
  const authStatus = useAppSelector((state) => state.autorizationStatys);
  const dispatch = useAppDispatch();
  const offerDetailRef = `${AppRoute.Offer}/${id}`;


  const handelBookmarkButton = () => {

    if (authStatus === AuthorizationStatus.Auth) {
      setCard({ ...card, isFavorite: !isFavorite });
      const favoriteStatus = {
        idOffer: id,
        status: Number(!isFavorite),
      };
      dispatch(changeFavoriteStatus(favoriteStatus))
        .then(() => dispatch(fetchFavoritesOffers()));

    }
  };

  return (
    <article className="favorites__card place-card">
      {isPremium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div> :
        null}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={offerDetailRef}>
          <img className="place-card__image" src={previewImage} width="150" height="110" alt="Place image" />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
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
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${rating / FIVE_STARS * 100}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={offerDetailRef}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

export default FavoriteCard;
