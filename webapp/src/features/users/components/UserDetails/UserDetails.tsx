import React from 'react';
import cx from 'classnames';
import { Field, FieldProps } from 'formik';

import styles from './UserDetails.module.scss';
import { Input } from '../../../../app/components';
import { User } from '../../../../app/models/user';
import { mapRoleAsString } from '../../../../app/helpers/userHelper';
import { Role } from '../../../../app/models/role';

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
                <option value={Role.Client}>Client</option>
                <option value={Role.Realtor}>Realtor</option>
                <option value={Role.Admin}>Admin</option>
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
