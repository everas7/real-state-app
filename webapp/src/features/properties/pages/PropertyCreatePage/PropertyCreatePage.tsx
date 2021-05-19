import React, { useState } from 'react';

import PropertyForm from '../../components/PropertyForm/PropertyForm';
import { Breadcrumb } from '../../../../app/components';
import { IPropertyForm } from '../../../../app/models/property';
import { Properties } from '../../services/propertiesApi';
import { history } from '../../../../index';
import { useAppSelector } from '../../../../app/store/hooks';
import { selectAuthenticatedUser } from '../../../access/services/accessSlice';
import { Realtor } from '../../../../app/models/user';
import { Col, Row } from 'react-bootstrap';
import styles from './PropertyCreatePage.module.scss';
import { Role } from '../../../../app/models/role';

export default function PropertyCreatePage() {
  const user = useAppSelector(selectAuthenticatedUser);

  const [property] = useState<IPropertyForm>({
    name: '',
    price: 0,
    address: '',
    description: '',
    rooms: 1,
    floorAreaSize: 0,
    geolocation: null,
    realtorId: user?.role === Role.Realtor ? user!.id : 0,
    realtor: user! as Realtor,
    available: true,
  });

  const onSubmitClickHandler = (values: any, { setSubmitting }: any) => {
    Properties.create({
      ...values,
      price: Number(String(values.price).replace(/[^0-9.]/g, '')),
      floorAreaSize: Number(
        String(values.floorAreaSize).replace(/[^0-9]/g, '')
      ),
      rooms: Number(String(values.rooms).replace(/[^0-9]/g, '')),
      realtorId: values.realtorId || user!.id,
      available: true,
    }).then((res) => {
      setSubmitting(false);
      history.push(`/apartments/${res.id}`);
    });
  };

  return (
    <>
      <Col>
        <Row>
          <Col>
            <Breadcrumb
              items={[{ name: 'Appartments', path: '/' }, { name: 'Create' }]}
            />
          </Col>
        </Row>
      </Col>
      <Col md="12" className={styles['property-create-page__content']}>
        <Row>
          <PropertyForm property={property} onSubmit={onSubmitClickHandler} />
        </Row>
      </Col>
    </>
  );
}
