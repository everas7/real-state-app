import React, { useEffect, useState } from 'react';
import { GeoLocation, PropertyForList } from '../models/property';
import { Properties } from '../services/propertiesApi';
import PropertyCard from '../components/PropertyCard/PropertyCard';
import { Container, Row, Col } from 'react-bootstrap';
import GoogleMapReact from 'google-map-react';
import { FaBuilding } from 'react-icons/fa';

const MapMarker: any = () => <FaBuilding color="#3eb49e"/>;

export default function PropertyListPage() {
  const [properties, setProperties] = useState<PropertyForList[]>([]);
  useEffect(() => {
    Properties.list().then((res) => {
      setProperties(res);
    });
  }, []);

  return (
    <>
        <Col md="6" className="overflow-auto mh-100">
          Apartments
          <Row>
            {properties.map((property) => (
              <Col md="6">
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
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: String(process.env.REACT_APP_GOOGLE_API_KEY),
                }}
                defaultCenter={{
                  lat: properties[0].geolocation.coordinates[0],
                  lng: properties[0].geolocation.coordinates[1],
                }}
                defaultZoom={11}
              >
                {properties.map((property) => (
                  <MapMarker
                    lat={property.geolocation.coordinates[0]}
                    lng={property.geolocation.coordinates[1]}
                  />
                ))}
              </GoogleMapReact>
            )) ||
              ''}
          </div>
        </Col>
    </>
  );
}
