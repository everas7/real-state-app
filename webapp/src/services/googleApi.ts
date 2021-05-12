
export const getGeolocationByAddress = (address: string) => {
  if (window.google?.maps) {
    new window.google.maps.Geocoder().geocode(
      { address },
      function (
        results: google.maps.GeocoderResult[],
        status: google.maps.GeocoderStatus
      ) {
        if (status === window.google.maps.GeocoderStatus.OK) {

        }
      }
    )
  }
};