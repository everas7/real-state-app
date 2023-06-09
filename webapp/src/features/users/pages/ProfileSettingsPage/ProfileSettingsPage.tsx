import { Form, Formik } from 'formik';
import cx from 'classnames';
import _ from 'lodash';
import { Col, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';

import styles from './ProfileSettingsPage.module.scss';
import {
  Breadcrumb,
  Button,
  FullScreenSpinner,
} from '../../../../app/components';
import { history } from '../../../../index';
import { Users } from '../../../../app/services/usersApi';
import UserDetails from '../../components/UserDetails/UserDetails';
import {
  userCreateSchema,
  userUpdateSchema,
} from '../../validators/userValidator';
import { useAppSelector } from '../../../../app/store/hooks';
import { selectAuthenticatedUser } from '../../../access/services/accessSlice';

export default function ProfileSettingsPage() {
  const user = useAppSelector(selectAuthenticatedUser);

  const onSubmitClickHandler = (values: any, { setSubmitting }: any) => {
    Users.updateMe({
      ...values,
      password: values.password || user?.password,
    })
      .then(() => {
        setSubmitting(false);
        history.push(`/`);
        window.location.reload();
      })
      .catch((err) => {
        if (
          err.status === 400 &&
          err.data.message === 'User email already exists'
        ) {
          toast.error('Email is already registered', {
            position: 'top-center',
          });
        }
        setSubmitting(false);
      });
  };

  if (!user) return <FullScreenSpinner alt="Loading user..." />;

  const breadCrumbItems = [{ name: 'Profile Settings' }];

  return (
    <>
      <Col md="12">
        <Row>
          <Col>
            <Breadcrumb items={breadCrumbItems} />
          </Col>
        </Row>
      </Col>
      <Col md="8" className={cx(styles['profile-settings-page__content'])}>
        <Formik
          initialValues={{
            name: user?.name || '',
            email: user?.email || '',
            password: '',
            role: user?.role,
          }}
          validationSchema={user?.id ? userUpdateSchema : userCreateSchema}
          onSubmit={onSubmitClickHandler}
        >
          {({ errors, submitForm, isSubmitting }) => (
            <Form>
              <UserDetails
                user={user!}
                edit={true}
                settings={true}
                create={!user?.id}
              />
              <div className={styles['profile-settings-page__controls']}>
                <Button
                  disabled={isSubmitting || !_.isEmpty(errors)}
                  onClick={submitForm}
                  loading={isSubmitting}
                >
                  {'Save Changes'}
                </Button>
                <Button
                  variant="light"
                  onClick={() => {
                    history.push(`/`);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Col>
    </>
  );
}
