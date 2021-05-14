import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropertyForm from '../../components/PropertyForm/PropertyForm';
import Breadcrumb from '../../../../components/Breadcrumb/Breadcrumb';
import { Property } from '../../models/property';
import { Properties } from '../../services/propertiesApi';
import { history } from '../../../../index';

export default function PropertyEditPage() {
  const [property, setProperty] = useState<Property>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    Properties.get(parseInt(id)).then((res) => {
      setProperty(res);
    });
  }, []);

  const onSubmitClickHandler = (values: any, { setSubmitting }: any) => {
    Properties.update(+id, {
      ...values,
      available: property!.available,
      realtorId: property!.realtorId,
    }).then(() => {
      setSubmitting(false);
      history.push(`/apartments/${id}`);
    });
  };

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
      <PropertyForm
        property={property}
        onSubmit={onSubmitClickHandler}
      />
    </>
  );
}
