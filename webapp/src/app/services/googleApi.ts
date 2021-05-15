import { GeoLocation } from '../models/property';

export const getGeolocationByAddress = (
  address: string
): Promise<GeoLocation | undefined> => {
  if (window.google?.maps) {
    return new Promise((resolve, reject) => {
      new window.google.maps.Geocoder().geocode(
        { address },
        (
          results: google.maps.GeocoderResult[],
          status: google.maps.GeocoderStatus
        ) => {
          if (status === window.google.maps.GeocoderStatus.OK) {
            resolve({
              latitude: results[0].geometry.location.lat(),
              longitude: results[0].geometry.location.lng(),
            });
          }
        }
      );
    });
  }
  return new Promise(() => undefined);
};

export const getAddressByGeolocation = (
  geolocation: GeoLocation
): Promise<string | undefined> => {
  if (window.google?.maps) {
    return new Promise((resolve, reject) => {
      new window.google.maps.Geocoder().geocode(
        {
          location: {
            lat: geolocation.latitude,
            lng: geolocation.longitude,
          },
        },
        (
          results: google.maps.GeocoderResult[],
          status: google.maps.GeocoderStatus
        ) => {
          if (status === window.google.maps.GeocoderStatus.OK) {
            resolve(results[0].formatted_address);
          }
        }
      );
    });
  }
  return new Promise(() => undefined);
};
