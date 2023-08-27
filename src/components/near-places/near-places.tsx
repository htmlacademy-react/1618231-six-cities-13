import PlaceCard from '../place-card/place-card';
import { OfferType } from '../../types/offer-type';

type NearPlacesProps = {
  nearPlaces: OfferType[];
}

const NearPlaces = ({ nearPlaces }: NearPlacesProps): JSX.Element => (
  <section className="near-places places">
    <h2 className="near-places__title">Other places in the neighbourhood</h2>
    <div className="near-places__list places__list">
      {nearPlaces.map((item) => (
        <PlaceCard data={item} key={item.id} />
      ))}
    </div>
  </section>
);

export default NearPlaces;
