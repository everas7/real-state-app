import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import cx from 'classnames';

import './Signup.scss';
import { Input } from '../../../../components/Input/Input';
import Button from '../../../../components/Button/Button';
import { ButtonGroup } from 'react-bootstrap';
import { SignupForm } from '../../models/signup';
import { Access } from '../../services/accessApi';
import { useAppDispatch } from '../../../../store/hooks';
import { login } from '../../services/accessSlice';

interface Props {
  onSwitch(): void;
}

export default function Signup({ onSwitch }: Props): React.ReactElement<Props> {
  const [role, setRole] = useState<'CLIENT' | 'REALTOR'>('CLIENT');
  const dispatch = useAppDispatch();

  async function handleSignup(signupForm: SignupForm) {
    return Access.signup(signupForm).then((res) => {
      dispatch(
        login({
          email: signupForm.email,
          password: signupForm.password,
        })
      );
    });
  }

  return (
    <div className="signup">
      <div className="signup__header">
        <h2 className="text-primary">Create an Account</h2>
      </div>
      <div className="signup__role-toggle">
        <ButtonGroup>
          <Button
            variant={cx({
              primary: role === 'CLIENT',
              'outline-primary': role === 'REALTOR',
            })}
            onClick={() => setRole('CLIENT')}
          >
            As a Client
          </Button>
          <Button
            variant={cx({
              primary: role === 'REALTOR',
              'outline-primary': role === 'CLIENT',
            })}
            onClick={() => setRole('REALTOR')}
          >
            As a Realtor
          </Button>
        </ButtonGroup>
      </div>
      <div className="signup__form">
        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          onSubmit={(values, { setSubmitting }) => {
            handleSignup({ ...values, role }).then(() => {
              setSubmitting(false);
            });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                type="text"
                name="name"
                placeholder="Full Name"
                component={Input}
              />
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
                SIGN UP
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="signup__access-switch">
        Already have an account?
        <span className="text-primary control" onClick={onSwitch}>
          Login
        </span>
      </div>
    </div>
  );
}
