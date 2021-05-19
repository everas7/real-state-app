import React, { useEffect, useState } from 'react';
import { FaBed, FaRulerCombined } from 'react-icons/fa';
import cx from 'classnames';
import { Field, FieldProps, FormikContextType } from 'formik';

import { Property, IPropertyForm } from '../../../../app/models/property';
import styles from './PropertyDetails.module.scss';
import * as Constants from '../../../../app/constants';
import { NumericInput, Input } from '../../../../app/components';
import { AuthorizedComponent } from '../../../../app/authorization/AuthorizedComponent';
import { Users } from '../../../../app/services/usersApi';
import { User } from '../../../../app/models/user';
import { useAppSelector } from '../../../../app/store/hooks';
import { selectAuthenticatedUser } from '../../../access/services/accessSlice';
import { Role } from '../../../../app/models/role';
import { Permissions } from '../../../../app/authorization/permissions';
import Select, { ActionMeta } from 'react-select';

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
                suffix: '',
                allowDecimal: false,
              }}
              placeholder="0 rooms"
              component={NumericInput}
              value={formik!.values.rooms}
              onChange={formik!.handleChange}
              icon={<FaBed color={Constants.PRIMARY_COLOR} />}
            />
          ) : (
            <div className={styles['property-details__dimensions-details']}>
              <FaBed color={Constants.PRIMARY_COLOR} />
              <span className={styles['property-details__dimensions-text']}>
                <b>{property.rooms}</b>
                {' Rooms'}
              </span>
            </div>
          )}{' '}
        </div>
        <div>
          {edit ? (
            <Field
              name="floorAreaSize"
              maskOptions={{
                prefix: '',
                suffix: '',
                allowDecimal: false,
              }}
              placeholder="0 ft²"
              component={NumericInput}
              value={formik!.values.floorAreaSize}
              onChange={formik!.handleChange}
              icon={<FaRulerCombined color={Constants.PRIMARY_COLOR} />}
            />
          ) : (
            <div className={styles['property-details__dimensions-details']}>
              <FaRulerCombined color={Constants.PRIMARY_COLOR} />
              <span className={styles['property-details__dimensions-text']}>
                <b> {property.floorAreaSize.toLocaleString()} </b> ft
                <sup>2</sup>
              </span>
            </div>
          )}{' '}
        </div>
      </div>
      <div className={styles['property-details__description']}>
        {edit ? (
          <>
            Description
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
          </>
        ) : (
          <div className={styles['property-details__description-text']}>
            {property.description}
          </div>
        )}
      </div>
      <div className={styles['property-details__realtor']}>
        Contact Information
        <AuthorizedComponent
          rolesAllowed={Permissions.Properties.Create.RealtorField}
          customValidation={() => edit}
        >
          {edit ? (
            <Field name="realtorId">
              {(props: FieldProps) => (
                <Select
                  {...props}
                  placeholder="Realtor"
                  searchable={true}
                  labelKey="name"
                  valueKey="id"
                  getOptionLabel={(option: User) =>
                    `${option.name}-${option.email}`
                  }
                  getOptionValue={(option: User) => String(option.id)}
                  options={userOptions}
                  value={userOptions.find(
                    (u) => u.id === formik!.values.realtorId
                  )}
                  menuPlacement="auto"
                  onChange={(
                    value: User | null,
                    actionMeta: ActionMeta<User>
                  ) => formik!.setFieldValue('realtorId', value?.id || 0)}
                />
              )}
            </Field>
          ) : null}
          <>
            <div>{property.realtor.name}</div>
            <div>
              <a href={`mailto:${property.realtor.email}`}>
                {property.realtor.email}
              </a>
            </div>
          </>
        </AuthorizedComponent>
      </div>
    </div>
  );
}
