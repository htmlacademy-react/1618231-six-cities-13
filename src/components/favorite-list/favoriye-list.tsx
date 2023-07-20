import { OfferType } from '../../types/offer-type';
import FavoriteCard from '../favorite-card/favorite-card';
import { Cities } from '../const';

type FavoriteListProps = {
  favorites: OfferType[];
}


const FavoriteList = ({ favorites }: FavoriteListProps): JSX.Element => {
  const getFavOffersCities = (city: string) => favorites.filter((item) => item.city.name.toLowerCase() === city.toLowerCase());

  return (
    <ul className="favorites__list">
      {Object.keys(Cities).map((city) => (
        getFavOffersCities(city).length > 0 &&
          <li className="favorites__locations-items" key={city}>
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="#">
                  <span>{city}</span>
                </a>
              </div>
            </div>
            <div className="favorites__places">
              {favorites.filter((item) => item.city.name.toLowerCase() === city.toLowerCase())
                .map((item) => (
                  <FavoriteCard data={item} key={item.id} />
                ))}
            </div>
          </li>
      ))}
    </ul>
  );
};

export default FavoriteList;
