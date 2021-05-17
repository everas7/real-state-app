import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Formik } from 'formik';
import cx from 'classnames';
import _ from 'lodash';
import { Col } from 'react-bootstrap';

import styles from './UserFormPage.module.scss';
import { Breadcrumb, Button, NotFound } from '../../../../app/components';
import { User } from '../../../../app/models/user';
import { history } from '../../../../index';
import { Users } from '../../../../app/services/usersApi';
import UserDetails from '../../components/UserDetails/UserDetails';
import {
  userCreateSchema,
  userUpdateSchema,
} from '../../validators/userValidator';

export default function UserFormPage() {
  const [user, setUser] = useState<User>();
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      Users.get(parseInt(id, 10))
        .then((res) => {
          setUser(res);
        })
        .catch((err) => {
          if (err.status === 403 || err.status === 404) {
            setError('Not Found');
          }
        });
    }
  }, [id]);

  const onSubmitClickHandler = (values: any, { setSubmitting }: any) => {
    if (id) {
      Users.update(+id, {
        ...values,
        password: values.password || user?.password,
      }).then(() => {
        setSubmitting(false);
        history.push(`/users/${id}`);
      });
    } else {
      Users.create({
        ...values,
      }).then((res) => {
        setSubmitting(false);
        history.push(`/users/${res.id}`);
      });
    }
  };

  if (error === 'Not Found') return <NotFound />;
  if (id && !user) return <div>Loading appartment...</div>;

  const breadCrumbItems = user?.id
    ? [
        { name: 'Users', path: '/' },
        { name: id, path: `/users/${id}` },
        { name: 'Edit' },
      ]
    : [{ name: 'Users', path: '/' }, { name: 'Create' }];

  return (
    <>
      <Breadcrumb items={breadCrumbItems} />
      <Col md="8" className={cx(styles['user-form-page__content'])}>
        <Formik
          initialValues={{
            name: user?.name || '',
            email: user?.email || '',
            password: '',
            role: user?.role || '',
          }}
          validationSchema={user?.id ? userUpdateSchema : userCreateSchema}
          onSubmit={onSubmitClickHandler}
        >
          {({ errors, submitForm }) => (
            <Form>
              <div className={styles['user-form-page__controls']}>
                <Button disabled={!_.isEmpty(errors)} onClick={submitForm}>
                  {user?.id ? 'Save Changes' : 'Create User'}
                </Button>
                <Button
                  variant="light"
                  onClick={() => {
                    history.push(`/users/${user?.id || ''}`);
                  }}
                >
                  Cancel
                </Button>
              </div>
              <UserDetails user={user!} edit={true} />
            </Form>
          )}
        </Formik>
      </Col>
    </>
  );
}