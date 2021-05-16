import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import { PropertyForList } from '../../../../app/models/property';
import { Properties } from '../../services/propertiesApi';
import PropertyFilters from '../../components/PropertyFilters/PropertyFilters';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import { Button, Map, IMarker } from '../../../../app/components';
import { history } from '../../../../index';
import styles from './PropertyListPage.module.scss';
import { AuthorizedComponent } from '../../../../app/hoc/AuthorizedComponent';

export default function PropertyListPage() {
  const [properties, setProperties] = useState<PropertyForList[]>([]);
  useEffect(() => {
    Properties.list().then((res) => {
      setProperties(res);
    });
  }, []);

  const defaultCenter = {
    lat: properties[0]?.geolocation.latitude || 0,
    lng: properties[0]?.geolocation.longitude || 0,
  };

  const coordinates = properties.map((p) => ({
    id: p.id,
    lat: p.geolocation.latitude,
    lng: p.geolocation.longitude,
  }));

  function onFilterProperties(filters: URLSearchParams) {
    Properties.list(filters).then((res) => {
      setProperties(res);
    });
  }
  const [popupCoordinates, setPopupCoordinates] =
    useState<undefined | IMarker>();

  function handleMarkerClick(id: number) {
    history.push(`/apartments/${id}`);
  }

  function handleMarkerMouseIn(id: number) {
    const coord = coordinates.find((c) => c.id === id)!;
    setPopupCoordinates({
      id: coord.id!,
      lat: coord.lat,
      lng: coord.lng,
    });
  }

  function handleMarkerMouseOut() {
    setPopupCoordinates(undefined);
  }

  const Popup = () => {
    if (!popupCoordinates) return null;
    let propertyInfo = properties.find((p) => p.id === popupCoordinates.id);
    propertyInfo = propertyInfo!;
    return (
      <div className={styles['property-list-page__map-property']}>
        <PropertyCard
          title={propertyInfo.name}
          rooms={propertyInfo.rooms}
          price={propertyInfo.price}
          floorAreaSize={propertyInfo.floorAreaSize}
          address={propertyInfo.address}
          available={propertyInfo.available}
        />
      </div>
    );
  };

  return (
    <>
      <Col md="2" className="mh-100">
        <PropertyFilters onApplyFilter={onFilterProperties} />
      </Col>
      <Col md="5" className={styles['property-list-page__list']}>
        <div className={styles['property-list-page__header']}>
          <div className={styles['property-list-page__header-title']}>
            Apartments
          </div>
          <AuthorizedComponent rolesAllowed={['REALTOR', 'ADMIN']}>
            <Button onClick={() => history.push('/apartments/create')}>
              Add Apartment
            </Button>
          </AuthorizedComponent>
        </div>

        <Row>
          {properties.map((property, i) => (
            <Col
              xl="6"
              lg="12"
              md="12"
              sm="12"
              onClick={() => history.push(`/apartments/${property.id}`)}
              key={`property_card-${i}`}
            >
              <PropertyCard
                title={property.name}
                rooms={property.rooms}
                price={property.price}
                floorAreaSize={property.floorAreaSize}
                address={property.address}
                available={property.available}
              />
            </Col>
          ))}
        </Row>
      </Col>
      <Col md="5" className="overflow-hidden mh-100">
        <div style={{ height: '100%', width: '100%' }}>
          {(properties.length && (
            <Map
              defaultCenter={defaultCenter}
              markers={coordinates}
              onMarkerClick={handleMarkerClick}
              onMarkerMouseIn={handleMarkerMouseIn}
              onMarkerMouseOut={handleMarkerMouseOut}
              popupComponent={Popup}
              popupInfo={popupCoordinates}
            />
          )) ||
            ''}
        </div>
      </Col>
    </>
  );
}
