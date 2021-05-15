import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

import { PropertyForList } from '../../../../app/models/property';
import { Properties } from '../../services/propertiesApi';
import PropertyFilters from '../../components/PropertyFilters/PropertyFilters';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import { Button, Map } from '../../../../app/components';
import { history } from '../../../../index';
import styles from './PropertyListPage.module.scss';

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
    lat: p.geolocation.latitude,
    lng: p.geolocation.longitude,
  }));

  function onFilterProperties(filters: URLSearchParams) {
    Properties.list(filters).then((res) => {
      setProperties(res);
    });
  }

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
          <Button onClick={() => history.push('/apartments/create')}>
            Add Apartment
          </Button>
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
              />
            </Col>
          ))}
        </Row>
      </Col>
      <Col md="5" className="overflow-hidden mh-100">
        <div style={{ height: '100%', width: '100%' }}>
          {(properties.length && (
            <Map defaultCenter={defaultCenter} markers={coordinates} />
          )) ||
            ''}
        </div>
      </Col>
    </>
  );
}
