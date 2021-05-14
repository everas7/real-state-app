import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import cx from 'classnames';
import PropertyCorousel from '../../components/PropertyCorousel/PropertyCorousel';
import PropertyDetails from '../../components/PropertyDetails/PropertyDetails';
import Breadcrumb from '../../../../components/Breadcrumb/Breadcrumb';
import { Property, PropertyForm } from '../../models/property';
import { Properties } from '../../services/propertiesApi';
import Map from '../../../../components/Map/Map';
import styles from './PropertyEditPage.module.scss';
import Button from '../../../../components/Button/Button';
import { Formik } from 'formik';
import { propertySchema } from '../../validators/propertyValidator';
import { history } from '../../../../index';

export default function PropertyEditPage() {
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
      lat: property?.geolocation.latitude,
      lng: property?.geolocation.longitude,
    };
  }

  const onSubmitClickHandler = (values: any, { setSubmitting }: any) => {
    Properties.update(+id, {
      ...values,
      available: property!.available,
      geolocation: property!.geolocation,
      realtorId: property!.realtorId,
    }).then(() => {
      setSubmitting(false);
      history.push(`/apartments/${id}`);
    });
  };

  return (
    <>
      <Breadcrumb
        items={[
          { name: 'Appartments', path: '/' },
          { name: id, path: `/apartments/${id}` },
          { name: 'Edit' },
        ]}
      />
      <Col className={cx(styles['property-edit-page__content'])}>
        <Row className={cx('')}>
          <Col md="6">
            <Row>
              <PropertyCorousel />
            </Row>
            <Row
              className={cx(styles['property-edit-page__map'], 'flex-grow-1')}
            >
              {(property && coordinate && (
                <Map defaultCenter={coordinate} markers={[coordinate]} />
              )) ||
                ''}
            </Row>
          </Col>
          <Col md="6" className="flex-grow-1">
            {(property && (
              <Formik
                initialValues={{
                  name: property.name,
                  price: property.price,
                  address: property.address,
                  description: property.description,
                  rooms: property.rooms,
                  floorAreaSize: property.floorAreaSize,
                }}
                validate={() => ({})}
                onSubmit={onSubmitClickHandler}
              >
                {({ isSubmitting, errors, submitForm }) => (
                  <Form>
                    <div className={styles['property-edit-page__controls']}>
                      <Button onClick={submitForm}>Save Changes</Button>
                      <Button
                        variant="light"
                        onClick={() => {
                          history.push(`/apartments/${id}`);
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                    <PropertyDetails property={property} edit />
                  </Form>
                )}
              </Formik>
            )) ||
              ''}
          </Col>
        </Row>
      </Col>
    </>
  );
}
