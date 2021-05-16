import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PropertyForm from '../../components/PropertyForm/PropertyForm';
import { Breadcrumb } from '../../../../app/components';
import { IPropertyForm, Property } from '../../../../app/models/property';
import { Properties } from '../../services/propertiesApi';
import { history } from '../../../../index';
import { useAppSelector } from '../../../../app/store/hooks';
import { selectAuthenticatedUser } from '../../../access/services/accessSlice';
import { Realtor } from '../../../../app/models/user';

export default function PropertyCreatePage() {
  const user = useAppSelector(selectAuthenticatedUser);

  const [property, setProperty] = useState<IPropertyForm>({
    name: '',
    price: 0,
    address: '',
    description: '',
    rooms: 1,
    floorAreaSize: 0,
    geolocation: null,
    realtorId: user!.id,
    realtor: user! as Realtor,
    available: true,
  });

  const onSubmitClickHandler = (values: any, { setSubmitting }: any) => {
    Properties.create({
      ...values,
      price: Number(values.price.replace(/\D+/g, '')),
      realtorId: values.realtor || user!.id,
      available: true,
    }).then((res) => {
      setSubmitting(false);
      history.push(`/apartments/${res.id}`);
    });
  };

  return (
    <>
      <Breadcrumb
        items={[{ name: 'Appartments', path: '/' }, { name: 'Create' }]}
      />
      <PropertyForm property={property} onSubmit={onSubmitClickHandler} />
    </>
  );
}
