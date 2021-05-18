import React, { useEffect, useState } from 'react';
import { FaBed, FaRulerCombined } from 'react-icons/fa';
import cx from 'classnames';
import { Property, IPropertyForm } from '../../../../app/models/property';
import styles from './PropertyDetails.module.scss';
import * as Constants from '../../../../app/constants';
import { Field, FieldProps, FormikContextType } from 'formik';
import { NumericInput, Input } from '../../../../app/components';
import { AuthorizedComponent } from '../../../../app/authorization/AuthorizedComponent';
import { Users } from '../../../../app/services/usersApi';
import { User } from '../../../../app/models/user';
import { useAppSelector } from '../../../../app/store/hooks';
import { selectAuthenticatedUser } from '../../../access/services/accessSlice';
import { Role } from '../../../../app/models/role';
import { Permissions } from '../../../../app/authorization/permissions';

export interface PropertyFormValues
  extends Omit<IPropertyForm, 'realtorId' | 'available' | 'realtor'> {
  realtorId: number | null;
}

interface Props {
  property: Property;
  edit?: boolean;
  formik?: FormikContextType<PropertyFormValues>;
}

export default function PropertyDetails({
  property,
  edit = false,
  formik,
}: Props): React.ReactElement<Props> {
  const [userOptions, setUserOptions] = useState<User[]>([]);
  const user = useAppSelector(selectAuthenticatedUser);

  useEffect(() => {
    if (user?.role === Role.Admin) {
      const params = new URLSearchParams();
      params.append('filters[role]', String(Role.Realtor));
      Users.list(params).then((res) => {
        setUserOptions(res);
      });
    }
  }, [user]);
  return (
    <div className={cx(styles['property-details'])}>
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
            component={NumericInput}
            value={formik!.values.price}
            onChange={formik!.handleChange}
          />
        ) : (
          `$${property.price.toLocaleString()}`
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
              name="rooms"
              maskOptions={{
                prefix: '',
                suffix: ' rooms',
                allowDecimal: false,
              }}
              placeholder="0 rooms"
              component={NumericInput}
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
              name="floorAreaSize"
              maskOptions={{
                prefix: '',
                suffix: ' ft²',
                allowDecimal: false,
              }}
              placeholder="0 ft²"
              component={NumericInput}
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
            value={formik!.values.description}
            onChange={formik!.handleChange}
          >
            {(props: FieldProps) => (
              <Input
                {...props}
                placeholder="Description of the apartment"
                as="textarea"
              />
            )}
          </Field>
        ) : (
          <div>{property.description}</div>
        )}
      </div>
      <div className={styles['property-details__realtor']}>
        Contact Information
        <AuthorizedComponent
          rolesAllowed={Permissions.Properties.Create.RealtorField}
          customValidation={() => edit}
        >
          {edit ? (
            <Field
              name="realtorId"
              value={formik!.values.realtorId}
              onChange={formik!.handleChange}
            >
              {(props: FieldProps) => (
                <Input {...props} placeholder="Realtor" as="select">
                  {userOptions.map((u, i) => (
                    <option key={i} value={u.id}>
                      {u.name} - {u.email}
                    </option>
                  ))}
                </Input>
              )}
            </Field>
          ) : null}
          <>
            <div>{property.realtor.name}</div>
            <div>{property.realtor.email}</div>
          </>
        </AuthorizedComponent>
      </div>
    </div>
  );
}
