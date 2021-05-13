import React from 'react';

import GoogleMapReact, { Props as GoogleMapReactProps } from 'google-map-react';
import { MapMarker } from '../MapMarker/MapMarker';

interface Props extends GoogleMapReactProps {
  markers: {
    lat: number;
    lng: number;
  }[];
}

export default function Map({
  defaultCenter,
  markers,
}: Props): React.ReactElement<Props> {
  return (
    <GoogleMapReact
      bootstrapURLKeys={{
        key: String(process.env.REACT_APP_GOOGLE_API_KEY),
      }}
      defaultCenter={defaultCenter}
      defaultZoom={11}
    >
      {markers.map((marker) => (
        <MapMarker lat={marker.lat} lng={marker.lng} />
      ))}
    </GoogleMapReact>
  );
}
