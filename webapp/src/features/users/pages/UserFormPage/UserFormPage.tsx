import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Formik } from 'formik';
import cx from 'classnames';
import _ from 'lodash';
import { Col, Row } from 'react-bootstrap';

import styles from './UserFormPage.module.scss';
import {
  Breadcrumb,
  Button,
  NotFound,
  FullScreenSpinner,
} from '../../../../app/components';
import { User } from '../../../../app/models/user';
import { history } from '../../../../index';
import { Users } from '../../../../app/services/usersApi';
import UserDetails from '../../components/UserDetails/UserDetails';
import {
  userCreateSchema,
  userUpdateSchema,
} from '../../validators/userValidator';
import { toast } from 'react-toastify';

export default function UserFormPage() {
  const [user, setUser] = useState<User>();
  const { id } = useParams<{ id: string }>();
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      const parsedId = parseInt(id, 10);
      if (isNaN(parsedId)) {
        setError('Not Found');
      } else {
        Users.get(parsedId)
          .then((res) => {
            setUser(res);
          })
          .catch((err) => {
            if (err.status === 403 || err.status === 404) {
              setError('Not Found');
            }
          });
      }
    }
  }, [id]);

  const onSubmitClickHandler = async (values: any, { setSubmitting }: any) => {
    try {
      if (id) {
        await Users.update(+id, {
          ...values,
          password: values.password || user?.password,
        }).then(() => {
          setSubmitting(false);
          history.push(`/users/${id}`);
        });
      } else {
        await Users.create({
          ...values,
        }).then((res) => {
          setSubmitting(false);
          history.push(`/users/${res.id}`);
        });
      }
    } catch (err) {
      if (
        err.status === 400 &&
        err.data.message === 'User email already exists'
      ) {
        toast.error('Email is already registered', {
          position: 'top-center',
        });
      }
      setSubmitting(false);
    }
  };

  if (error === 'Not Found') return <NotFound />;
  if (id && !user) return <FullScreenSpinner alt="Loading user..." />;

  const breadCrumbItems = user?.id
    ? [
        { name: 'Users', path: '/' },
        { name: id, path: `/users/${id}` },
        { name: 'Edit' },
      ]
    : [{ name: 'Users', path: '/' }, { name: 'Create' }];

  return (
    <>
      <Col md="12">
        <Row>
          <Col>
            <Breadcrumb items={breadCrumbItems} />
          </Col>
        </Row>
      </Col>
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
          {({ errors, submitForm, isSubmitting }) => (
            <Form>
              <div className={styles['user-form-page__controls']}>
                <Button
                  disabled={isSubmitting || !_.isEmpty(errors)}
                  onClick={submitForm}
                  loading={isSubmitting}
                >
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
              <UserDetails user={user!} edit={true} create={!user?.id} />
            </Form>
          )}
        </Formik>
      </Col>
    </>
  );
}
