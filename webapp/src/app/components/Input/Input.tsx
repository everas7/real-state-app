import React from 'react';
import { Form, FormControlProps } from 'react-bootstrap';
import { FieldProps } from 'formik';
import cx from 'classnames';
import { IconType } from 'react-icons';

import styles from './Input.module.scss';

interface Props extends FormControlProps, FieldProps {
  icon?: IconType;
  placeholder?: string;
}

export const Input: React.FC<Props> = ({
  field,
  form,
  meta,
  className,
  icon,
  ...props
}) => {
  return (
    <Form.Group className={cx(styles.input, className)}>
      <div className={cx({ 'inner-addon left-addon': !!icon })}>
        <span className="inputicon">{icon}</span>
        <Form.Control
          {...field}
          {...props}
          isInvalid={form?.touched[field.name] && !!form?.errors[field.name]}
        >
          {props.children}
        </Form.Control>
        <Form.Control.Feedback
          className={cx(styles['input__invalid-feedback'])}
          type="invalid"
        >
          {form?.errors[field.name]}
        </Form.Control.Feedback>
      </div>
    </Form.Group>
  );
};
