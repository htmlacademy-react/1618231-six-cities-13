import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchNearPlaces } from '../../store/api-actions';
import { useEffect } from 'react';
import PlaceCard from '../place-card/place-card';
import { Nullable, OfferType } from '../../types/offer-type';

type NearPlacesProps = {
  idOffer: string | undefined;
  setActiveCard: (offer: Nullable<OfferType>) => void;
}

const NearPlaces = ({ idOffer, setActiveCard }: NearPlacesProps): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (idOffer) {
      dispatch(fetchNearPlaces(idOffer));
    }
  }, [dispatch, idOffer]);

  const nearPlacesList = useAppSelector((state) => state.nearPlaces);

  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {nearPlacesList.map((item) => (
          <PlaceCard data={item} key={item.id} setActiveCard={setActiveCard} />
        ))}
      </div>
    </section>
  );
};

export default NearPlaces;
