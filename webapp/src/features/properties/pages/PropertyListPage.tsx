import React, { useEffect, useState } from 'react';
import { PropertyForList } from '../models/property';
import { Properties } from '../services/propertiesApi';
import PropertyCard from '../components/PropertyCard/PropertyCard';
import Map from '../../../components/Map/Map';
import { Row, Col } from 'react-bootstrap';

export default function PropertyListPage() {
  const [properties, setProperties] = useState<PropertyForList[]>([]);
  useEffect(() => {
    Properties.list().then((res) => {
      setProperties(res);
    });
  }, []);

  const defaultCenter = {
    lat: properties[0]?.geolocation.coordinates[0] || 0,
    lng: properties[0]?.geolocation.coordinates[1] || 0,
  };

  const coordinates = properties.map((p) => ({
    lat: p.geolocation.coordinates[0],
    lng: p.geolocation.coordinates[1],
  }));

  return (
    <>
      <Col md="6" className="overflow-auto mh-100">
        Apartments
        <Row>
          {properties.map((property) => (
            <Col xl="6" lg="12" md="12" sm="12">
              <PropertyCard
                title={property.name}
                rooms={property.rooms}
                price={property.price}
                floorAreaSize={property.floorAreaSize}
                address={'Av. Boulevard #21, Suite 20p'}
              />
            </Col>
          ))}
        </Row>
      </Col>
      <Col md="6">
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
