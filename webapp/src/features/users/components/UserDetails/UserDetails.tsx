import React, { useEffect, useState } from 'react';
import { FaBed, FaRulerCombined } from 'react-icons/fa';
import cx from 'classnames';
import styles from './UserDetails.module.scss';
import * as Constants from '../../../../app/constants';
import { Field, FieldProps, FormikContextType } from 'formik';
import { MaskInput, Input } from '../../../../app/components';
import { User } from '../../../../app/models/user';
import { mapRoleAsString } from '../../../../app/helpers/userHelper';

interface Props {
  user: User;
  edit?: boolean;
}

export default function UserDetails({
  user,
  edit = false,
}: Props): React.ReactElement<Props> {
  return (
    <div className={cx(styles['user-details'])}>
      <div className={styles['user-details__name']}>
        <div className={styles['user-details__label']}>Name</div>
        {edit ? (
          <Field
            type="text"
            name="name"
            placeholder="John Doe"
            component={Input}
          />
        ) : (
          user.name
        )}
      </div>
      <div className={styles['user-details__email']}>
        <div className={styles['user-details__label']}>Email</div>
        {edit ? (
          <Field
            type="text"
            name="email"
            placeholder="jdoe@gmail.com"
            component={Input}
          />
        ) : (
          user.email
        )}
      </div>
      <div className={styles['user-details__password']}>
        {edit ? (
          <>
            <div className={styles['user-details__label']}>Password</div>
            <Field
              type="text"
              name="password"
              placeholder="Password"
              component={Input}
            />
          </>
        ) : null}
      </div>
      <div className={styles['user-details__role']}>
        <div className={styles['user-details__label']}>Role</div>
        {edit ? (
          <Field name="role">
            {(props: FieldProps) => (
              <Input {...props} as="select">
                <option>CLIENT</option>
                <option>REALTOR</option>
                <option>ADMIN</option>
              </Input>
            )}
          </Field>
        ) : (
          mapRoleAsString(user.role)
        )}
      </div>
    </div>
  );
}
