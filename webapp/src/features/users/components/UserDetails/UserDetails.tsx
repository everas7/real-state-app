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
        <div className={styles['user-details__label']}>Full Name</div>
        {edit ? (
          <Field
            type="text"
            name="name"
            placeholder="Full Name"
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
            placeholder="email@test.com"
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
              type="password"
              name="password"
              placeholder="*****"
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
                <option>Select a Role...</option>
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
