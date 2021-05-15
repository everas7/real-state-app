import React, { ChangeEvent } from 'react';
import { FaBed, FaRulerCombined } from 'react-icons/fa';
import { Property, GeoLocation, IPropertyForm } from '../../../../app/models/property';
import styles from './PropertyDetails.module.scss';
import * as Constants from '../../../../app/constants';
import { Field, Form, Formik, FormikContextType, useField } from 'formik';
import { Input } from '../../../../app/components/Input/Input';
import { propertySchema } from '../../validators/propertyValidator';
import { getGeolocationByAddress } from '../../../../app/services/googleApi';

interface Values
  extends Omit<IPropertyForm, 'realtorId' | 'available'> {}

interface Props {
  property: Property;
  edit?: boolean;
  formik?: FormikContextType<Values>;
}

export default function PropertyDetails({
  property,
  edit = false,
  formik,
}: Props): React.ReactElement<Props> {
  return (
    <div className={styles['property-details']}>
      <div className={styles['property-details__name']}>
        {edit ? (
          <Field
            type="text"
            name="name"
            placeholder="Apartment Name"
            component={Input}
            value={formik!.values.name}
            onChange={formik!.handleChange}
          />
        ) : (
          property.name
        )}
      </div>
      <div className={styles['property-details__price']}>
        {edit ? (
          <Field
            type="text"
            name="price"
            placeholder="$0000"
            component={Input}
            value={formik!.values.price}
            onChange={formik!.handleChange}
          />
        ) : (
          `$${property.price}`
        )}
      </div>
      <div className={styles['property-details__address']}>
        {edit ? (
          <Field
            type="text"
            name="address"
            placeholder="Address"
            component={Input}
            value={formik!.values.address}
            onChange={formik!.handleChange}
          />
        ) : (
          property.address
        )}
      </div>
      <div className={styles['property-details__dimensions']}>
        <div>
          {edit ? (
            <Field
              type="number"
              name="rooms"
              placeholder="0"
              component={Input}
              value={formik!.values.rooms}
              onChange={formik!.handleChange}
              icon={<FaBed color={Constants.PRIMARY_COLOR} />}
            />
          ) : (
            <>
              <FaBed color={Constants.PRIMARY_COLOR} />
              {property.rooms}
              Rooms
            </>
          )}{' '}
        </div>
        <div>
          {edit ? (
            <Field
              type="number"
              name="floorAreaSize"
              placeholder="0 ft²"
              component={Input}
              value={formik!.values.floorAreaSize}
              onChange={formik!.handleChange}
              icon={<FaRulerCombined color={Constants.PRIMARY_COLOR} />}
            />
          ) : (
            <>
              <FaRulerCombined color={Constants.PRIMARY_COLOR} />
              {property.floorAreaSize} ft<sup>2</sup>
            </>
          )}{' '}
        </div>
      </div>
      <div className={styles['property-details__description']}>
        Description
        {edit ? (
          <Field
            name="description"
            placeholder="Description of the apartment"
            value={formik!.values.description}
            onChange={formik!.handleChange}
            component={(props: any) => (
              <Input as="textarea" {...props} rows={3} />
            )}
          />
        ) : (
          <div>{property.description}</div>
        )}
      </div>
      <div className={styles['property-details__realtor']}>
        Contact Information
        <div>{property.realtor.name}</div>
        <div>{property.realtor.email}</div>
      </div>
    </div>
  );
}
