import { useRef, useEffect } from 'react';
import { OfferType, Location, DetailedOfferType } from '../../types/offer-type';
import { Icon, Marker, layerGroup } from 'leaflet';
import useMap from '../hooks/use-map';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../const';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  currentOffers: OfferType[];
  center: Location;
  activeCardId?: string | undefined;
  detailedOffer?: DetailedOfferType;
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});


const Map = (props: MapProps): JSX.Element => {

  const { currentOffers, center, activeCardId, detailedOffer } = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, center);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      currentOffers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });
        marker.setIcon(offer.id === activeCardId ? currentCustomIcon : defaultCustomIcon).addTo(markerLayer);
      });

      if (detailedOffer) {
        const defaultMarker = new Marker({
          lat: detailedOffer?.location.latitude,
          lng: detailedOffer?.location.longitude,
        });
        defaultMarker.setIcon(currentCustomIcon).addTo(markerLayer);
      }
      return () => {
        map.removeLayer(markerLayer);
        map.removeLayer(markerLayer);
      };
    }
  }, [map, activeCardId, currentOffers, detailedOffer]);

  return (
    <div className="cities__map map" style={{ height: '100%' }} ref={mapRef}></div>
  );
};

export default Map;
