import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Row, Spinner } from 'react-bootstrap';

import PropertyForm from '../../components/PropertyForm/PropertyForm';
import { Breadcrumb, NotFound } from '../../../../app/components';
import { Property } from '../../../../app/models/property';
import { Properties } from '../../services/propertiesApi';
import { history } from '../../../../index';
import styles from './PropertyEditPage.module.scss';
import { debug } from 'console';

export default function PropertyEditPage() {
  const [property, setProperty] = useState<Property>();
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState('');

  useEffect(() => {
    Properties.get(parseInt(id, 10))
      .then((res) => {
        setProperty(res);
      })
      .catch((err) => {
        if (err.status === 403 || err.status === 404) {
          setError('Not Found');
        }
      });
  }, [id]);

  const onSubmitClickHandler = (values: any, { setSubmitting }: any) => {
    Properties.update(+id, {
      ...values,
      price: Number(String(values.price).replace(/[^0-9.]/g, '')),
      floorAreaSize: Number(
        String(values.floorAreaSize).replace(/[^0-9]/g, '')
      ),
      rooms: Number(String(values.rooms).replace(/[^0-9]/g, '')),
      available: property!.available,
      realtorId: values.realtorId || property!.realtorId,
    }).then(() => {
      setSubmitting(false);
      history.push(`/apartments/${id}`);
    });
  };

  if (error === 'Not Found') return <NotFound />;
  if (!property)
    return (
      <div className="full-screen-spinner">
        <Spinner
          as="span"
          animation="border"
          role="status"
          aria-hidden="true"
          variant="primary"
        />
        <span className="sr-only">Loading apartment...</span>{' '}
      </div>
    );

  return (
    <>
      <Col>
        <Row>
          <Col>
            <Breadcrumb
              items={[
                { name: 'Appartments', path: '/' },
                { name: id, path: `/apartments/${id}` },
                { name: 'Edit' },
              ]}
            />
          </Col>
        </Row>
      </Col>
      <Col md="12" className={styles['property-edit-page__content']}>
        <Row>
          <PropertyForm property={property} onSubmit={onSubmitClickHandler} />
        </Row>
      </Col>
    </>
  );
}
