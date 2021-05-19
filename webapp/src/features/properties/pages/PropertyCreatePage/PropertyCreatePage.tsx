import React, { useState } from 'react';
import { FormikHelpers } from 'formik';
import { Col, Row } from 'react-bootstrap';

import PropertyForm from '../../components/PropertyForm/PropertyForm';
import { Breadcrumb } from '../../../../app/components';
import { IPropertyForm } from '../../../../app/models/property';
import { Properties } from '../../services/propertiesApi';
import { history } from '../../../../index';
import { useAppSelector } from '../../../../app/store/hooks';
import { selectAuthenticatedUser } from '../../../access/services/accessSlice';
import { Realtor } from '../../../../app/models/user';
import styles from './PropertyCreatePage.module.scss';
import { Role } from '../../../../app/models/role';
import { PropertyFormValues } from '../../components/PropertyDetails/PropertyDetails';
import {
  removeNonNumeric,
  removeNonNumericForDecimal,
} from '../../../../app/helpers/stringHelper';

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

  const onSubmitClickHandler = (
    values: any,
    files: any[],
    { setSubmitting }: FormikHelpers<PropertyFormValues>
  ) => {
    Properties.create({
      ...values,
      price: Number(removeNonNumericForDecimal(values.price)),
      floorAreaSize: Number(removeNonNumeric(values.floorAreaSize)),
      rooms: Number(removeNonNumeric(values.rooms)),
      realtorId: values.realtorId || user!.id,
      available: true,
    }).then((res) => {
      const data = new FormData();
      files.forEach((file: Blob) => data.append('photos', file));
      Properties.uploadPhotos(res.id, data).then(() => {
        setSubmitting(false);
        history.push(`/apartments/${res.id}`);
      });
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
