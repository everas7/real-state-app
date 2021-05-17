import React from 'react';
import cx from 'classnames';

import GoogleMapReact, { Props as GoogleMapReactProps } from 'google-map-react';
import { MapMarker } from '../MapMarker/MapMarker';
import styles from './Map.module.scss';

export interface IMarker {
  id?: number;
  lat: number;
  lng: number;
}

interface Props extends GoogleMapReactProps {
  markers: IMarker[];
  className?: string;
  popupComponent?: React.FunctionComponent<any>;
  popupInfo?: IMarker;
  onMarkerClick?(id: number): void;
  onMarkerMouseIn?(id: number): void;
  onMarkerMouseOut?(): void;
}

export function Map({
  defaultCenter,
  markers,
  className,
  popupComponent: Popup,
  popupInfo,
  onMarkerClick,
  onMarkerMouseIn,
  onMarkerMouseOut,
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
          <MapMarker
            key={`${JSON.stringify(marker)}-${i}`}
            lat={marker.lat}
            lng={marker.lng}
            onClick={() => onMarkerClick && onMarkerClick(marker.id!)}
            onMouseOver={() => onMarkerMouseIn && onMarkerMouseIn(marker.id!)}
            onMouseOut={() => onMarkerMouseOut && onMarkerMouseOut()}
          />
        ))}
        {popupInfo && Popup && (
          <Popup
            onClick={() => onMarkerClick && onMarkerClick(popupInfo.id!)}
            lat={popupInfo.lat}
            lng={popupInfo.lng}
          />
        )}
      </GoogleMapReact>
    </div>
  );
}
