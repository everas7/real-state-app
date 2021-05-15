import React, { useEffect, useState } from 'react';
import { PropertyForList } from '../../models/property';
import { Properties } from '../../services/propertiesApi';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import PropertyFilters, {
  PropertyFiltersValues,
} from '../../components/PropertyFilters/PropertyFilters';
import Map from '../../../../components/Map/Map';
import { Row, Col, Form } from 'react-bootstrap';
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

  function onFilterProperties(filters: PropertyFiltersValues) {
    Properties.list({
      minPrice: filters.price.min,
      maxPrice: filters.price.max,
      minFloorAreaSize: filters.floorAreaSize.min,
      maxFloorAreaSize: filters.floorAreaSize.max,
      ...(filters.rooms.size ? { rooms: Array.from(filters.rooms) } : {}),
    }).then((res) => {
      setProperties(res);
    });
  }

  return (
    <>
      <Col md="2" className="mh-100">
        <PropertyFilters onApplyFilter={onFilterProperties} />
      </Col>
      <Col md="5" className={styles['property-list-page__list']}>
        Apartments
        <Row>
          {properties.map((property) => (
            <Col
              xl="6"
              lg="12"
              md="12"
              sm="12"
              onClick={() => history.push(`/apartments/${property.id}`)}
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
