import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Row, Spinner } from 'react-bootstrap';

import PropertyForm from '../../components/PropertyForm/PropertyForm';
import {
  Breadcrumb,
  NotFound,
  FullScreenSpinner,
} from '../../../../app/components';
import { Property } from '../../../../app/models/property';
import { Properties } from '../../services/propertiesApi';
import { history } from '../../../../index';
import styles from './PropertyEditPage.module.scss';
import {
  removeNonNumeric,
  removeNonNumericForDecimal,
} from '../../../../app/helpers/stringHelper';

export default function PropertyEditPage() {
  const [property, setProperty] = useState<Property>();
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState('');

  useEffect(() => {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      setError('Not Found');
    } else {
      Properties.get(parsedId)
        .then((res) => {
          setProperty(res);
        })
        .catch((err) => {
          if (err.status === 403 || err.status === 404) {
            setError('Not Found');
          }
        });
    }
  }, [id]);

  const onSubmitClickHandler = (
    values: any,
    files: any,
    { setSubmitting }: any
  ) => {
    Properties.update(+id, {
      ...values,
      price: Number(removeNonNumericForDecimal(values.price)),
      floorAreaSize: Number(removeNonNumeric(values.floorAreaSize)),
      rooms: Number(removeNonNumeric(values.rooms)),
      available: property!.available,
      realtorId: values.realtorId || property!.realtorId,
    }).then(async () => {
      // Delete Photos Logic
      const photosToDelete = property!.photos.filter(
        (p) => !files.some((f: any) => f.id === p.id)
      );
      if (photosToDelete.length) {
        const deleteParams = new URLSearchParams();

        photosToDelete.forEach((fileToDelete: any) => {
          deleteParams.append('ids[]', String(fileToDelete.id));
        });
        await Properties.deletePhotos(property!.id, deleteParams);
      }
      // Add Photos Logic
      const formData = new FormData();
      if (files.length) {
        files
          ?.filter((f: any) => !property?.photos.some((p) => f.id === p.id))
          .forEach((fileToUpload: any) => {
            formData.append('photos', fileToUpload);
          });
        await Properties.uploadPhotos(property!.id, formData);
      }

      setSubmitting(false);
      history.push(`/apartments/${id}`);
    });
  };

  if (error === 'Not Found') return <NotFound />;
  if (!property) return <FullScreenSpinner alt="Loading apartment..." />;

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
