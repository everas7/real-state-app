import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import cx from 'classnames';
import _ from 'lodash';
import { ButtonGroup, Spinner } from 'react-bootstrap';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';

import './Signup.scss';
import { Input, Button } from '../../../../app/components';
import { SignupForm } from '../../../../app/models/signup';
import { Access } from '../../services/accessApi';
import { useAppDispatch } from '../../../../app/store/hooks';
import { login } from '../../services/accessSlice';
import { signupSchema } from '../../validators/accessValidator';
import { Role } from '../../../../app/models/role';
import * as Constants from '../../../../app/constants';

interface Props {
  onSwitch(): void;
}

export default function Signup({ onSwitch }: Props): React.ReactElement<Props> {
  const [role, setRole] = useState<Role.Client | Role.Realtor>(Role.Client);
  const dispatch = useAppDispatch();

  async function handleSignup(signupForm: SignupForm, cb: () => void) {
    return Access.signup(signupForm).then((res) => {
      dispatch(
        login(
          {
            email: signupForm.email,
            password: signupForm.password,
          },
          cb
        )
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
              primary: role === Role.Client,
              'outline-primary': role === Role.Realtor,
            })}
            onClick={() => setRole(Role.Client)}
          >
            As a Client
          </Button>
          <Button
            variant={cx({
              primary: role === Role.Realtor,
              'outline-primary': role === Role.Client,
            })}
            onClick={() => setRole(Role.Realtor)}
          >
            As a Realtor
          </Button>
        </ButtonGroup>
      </div>
      <div className="signup__form">
        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          validationSchema={signupSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleSignup({ ...values, role }, () => setSubmitting(false));
          }}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              <Field
                type="text"
                name="name"
                placeholder="Full Name"
                component={Input}
                icon={<FaUser color={Constants.PRIMARY_COLOR} />}
              />
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
              <Button
                type="submit"
                disabled={isSubmitting || !_.isEmpty(errors)}
                loading={isSubmitting}
              >
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
