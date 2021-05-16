import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PropertyForm from '../../components/PropertyForm/PropertyForm';
import { Breadcrumb, NotFound } from '../../../../app/components';
import { Property } from '../../../../app/models/property';
import { Properties } from '../../services/propertiesApi';
import { history } from '../../../../index';

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
      price: Number(String(values.price).replace(/\D+/g, '')),
      available: property!.available,
      realtorId: property!.realtorId,
    }).then(() => {
      setSubmitting(false);
      history.push(`/apartments/${id}`);
    });
  };

  if (error === 'Not Found') return <NotFound />;
  if (!property) return <div>Loading appartment...</div>;

  return (
    <>
      <Breadcrumb
        items={[
          { name: 'Appartments', path: '/' },
          { name: id, path: `/apartments/${id}` },
          { name: 'Edit' },
        ]}
      />
      <PropertyForm property={property} onSubmit={onSubmitClickHandler} />
    </>
  );
}
