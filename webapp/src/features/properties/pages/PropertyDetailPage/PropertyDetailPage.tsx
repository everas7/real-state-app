import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import cx from 'classnames';

import PropertyCorousel from '../../components/PropertyCorousel/PropertyCorousel';
import PropertyDetails from '../../components/PropertyDetails/PropertyDetails';
import { Breadcrumb, Map, Button } from '../../../../app/components';
import { Property } from '../../../../app/models/property';
import { Properties } from '../../services/propertiesApi';
import styles from './PropertyDetailPage.module.scss';
import { history } from '../../../../index';

export default function PropertyDetailPage() {
  const [property, setProperty] = useState<Property>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    Properties.get(parseInt(id, 10)).then((res) => {
      setProperty(res);
    });
  }, [id]);
  let coordinate;

  if (property) {
    coordinate = {
      lat: property?.geolocation.latitude,
      lng: property?.geolocation.longitude,
    };
  }

  function changeAvailability() {
    const propertyValues = property!;
    const propertyForm = {
      name: propertyValues.name,
      description: propertyValues.description,
      floorAreaSize: propertyValues.floorAreaSize,
      price: propertyValues.price,
      rooms: propertyValues.rooms,
      available: !propertyValues.available,
      geolocation: propertyValues.geolocation,
      address: propertyValues.address,
      realtorId: propertyValues.realtorId,
    };
    Properties.update(+id, propertyForm).then((res) => {
      setProperty(res);
    });
  }
  if (!property) return <div>Loading Aparment...</div>;
  return (
    <>
      <Breadcrumb items={[{ name: 'Appartments', path: '/' }, { name: id }]} />
      <Col className={cx(styles['property-detail-page__content'])}>
        <Row className={cx('')}>
          <Col md="6">
            <Row>
              <PropertyCorousel />
            </Row>
            <Row
              className={cx(styles['property-detail-page__map'], 'flex-grow-1')}
            >
              {(property && coordinate && (
                <Map defaultCenter={coordinate} markers={[coordinate]} />
              )) ||
                ''}
            </Row>
          </Col>
          <Col md="6" className="flex-grow-1">
            <div className={styles['property-detail-page__controls']}>
              <Button onClick={() => history.push(`/apartments/${id}/edit`)}>
                Edit Apartment
              </Button>
              <Button variant="success" onClick={changeAvailability}>
                {property.available ? 'Set as Rented' : 'Set as Available'}
              </Button>
              <Button variant="danger">Delete</Button>
            </div>

            {(property && <PropertyDetails property={property} />) || ''}
          </Col>
        </Row>
      </Col>
    </>
  );
}
