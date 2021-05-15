import React from 'react';
import cx from 'classnames';
import GoogleMapReact, { Props as GoogleMapReactProps } from 'google-map-react';
import { MapMarker } from '../MapMarker/MapMarker';
import styles from './Map.module.scss';

interface Props extends GoogleMapReactProps {
  markers: {
    lat: number;
    lng: number;
  }[];
  className?: string;
}

export function Map({
  defaultCenter,
  markers,
  className,
  ...props
}: Props): React.ReactElement<Props> {
  return (
    <div className={cx(styles.map, className)}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: String(process.env.REACT_APP_GOOGLE_API_KEY),
        }}
        defaultCenter={defaultCenter}
        defaultZoom={15}
        {...props}
      >
        {markers.map((marker, i) => (
          <MapMarker key={`${JSON.stringify(marker)}  ${i}`} lat={marker.lat} lng={marker.lng} />
        ))}
      </GoogleMapReact>
    </div>
  );
}
