import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import cx from 'classnames';
import PropertyCorousel from '../../components/PropertyCorousel/PropertyCorousel';
import PropertyDetails from '../../components/PropertyDetails/PropertyDetails';
import Breadcrumb from '../../../../components/Breadcrumb/Breadcrumb';
import { Property } from '../../models/property';
import { Properties } from '../../services/propertiesApi';
import Map from '../../../../components/Map/Map';
import styles from './PropertyDetailPage.module.scss';

export default function PropertyDetailPage() {
  const [property, setProperty] = useState<Property>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    Properties.get(parseInt(id)).then((res) => {
      setProperty(res);
    });
  }, []);
  let coordinate;

  if (property) {
    coordinate = {
      lat: property?.geolocation.coordinates[0],
      lng: property?.geolocation.coordinates[1],
    };
  }

  return (
    <>
      <Breadcrumb items={[{ name: 'Appartments', path: '/' }, { name: id }]} />
      <Row
        className={cx('flex-shrink-0', styles['property-detail-page__content'])}
      >
        <Col md="6">
          <PropertyCorousel />
        </Col>
        <Col md="6">
          {(property && <PropertyDetails property={property} />) || ''}
        </Col>
      </Row>
      <Row className={cx('flex-grow-1', styles['property-detail-page__map'])}>
        <Col md="12">
          {(property && coordinate && (
            <Map defaultCenter={coordinate} markers={[coordinate]} />
          )) ||
            ''}
        </Col>
      </Row>
    </>
  );
}
