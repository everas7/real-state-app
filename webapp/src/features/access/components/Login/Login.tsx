import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import './Login.scss';
import { Input } from '../../../../components/Input/Input';
import Button from '../../../../components/Button/Button';
import { login } from '../../services/accessSlice';
import { useAppDispatch } from '../../../../store/hooks';

interface Props {
  onSwitch(): void;
}

export default function Login({ onSwitch }: Props): React.ReactElement<Props> {
  const dispatch = useAppDispatch();
  return (
    <div className="login">
      <div className="login__header">
        <h2 className="text-primary">Log In</h2>
      </div>
      <div className="login__form">
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(login(values));
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                type="email"
                name="email"
                placeholder="Email"
                component={Input}
              />
              <Field
                type="password"
                name="password"
                placeholder="Password"
                component={Input}
              />
              <ErrorMessage name="password" component="div" />
              <Button type="submit" disabled={isSubmitting}>
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
