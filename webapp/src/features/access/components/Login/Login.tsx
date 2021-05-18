import React from 'react';
import { Formik, Form, Field } from 'formik';
import _ from 'lodash';

import './Login.scss';
import { Input, Button } from '../../../../app/components';
import { login, selectAuthenticationError } from '../../services/accessSlice';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import { loginSchema } from '../../validators/accessValidator';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import * as Constants from '../../../../app/constants';

interface Props {
  onSwitch(): void;
}

export default function Login({ onSwitch }: Props): React.ReactElement<Props> {
  const dispatch = useAppDispatch();
  const authenticationError = useAppSelector(selectAuthenticationError);
  return (
    <div className="login">
      <div className="login__header">
        <h2 className="text-primary">Log In</h2>
      </div>
      <div className="login__form">
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(login(values));
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              <Field
                type="email"
                name="email"
                placeholder="Email"
                component={Input}
                icon={<FaEnvelope color={Constants.PRIMARY_COLOR} />}
              />
              <Field
                type="password"
                name="password"
                placeholder="Password"
                component={Input}
                icon={<FaLock color={Constants.PRIMARY_COLOR} />}
              />
              {authenticationError && (
                <div className="login__form-invalid-text text-danger">
                  Invalid email or password, please try again
                </div>
              )}
              <Button
                type="submit"
                disabled={isSubmitting || !_.isEmpty(errors)}
              >
                LOG IN
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="login__access-switch">
        <span className="text-primary" onClick={onSwitch}>
          Create an Account
        </span>
      </div>
    </div>
  );
}
