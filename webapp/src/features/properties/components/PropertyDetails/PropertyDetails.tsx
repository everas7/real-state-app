import React from 'react';
import { FaBed, FaRulerCombined } from 'react-icons/fa';
import { Property } from '../../models/property';
import styles from './PropertyDetails.module.scss';
import * as Constants from '../../../../constants';
import { Field, Form, Formik } from 'formik';
import { Input } from '../../../../components/Input/Input';
import { propertySchema } from '../../validators/propertyValidator';
import { TabContent } from 'react-bootstrap';
interface Props {
  property: Property;
  edit?: boolean;
}

export default function PropertyDetails({
  property,
  edit = false,
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
            component={(props: any) => <Input as="textarea" {...props} rows={3} />}
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
