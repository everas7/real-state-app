import React from 'react';
import { Form, FormControlProps } from 'react-bootstrap';
import { FieldProps } from 'formik';
import styles from './Input.module.scss';

interface Props extends FormControlProps, FieldProps {}

export const Input: React.FC<Props> = ({ field, form, meta, ...props }) => {
  return (
    <Form.Group className={styles.input}>
      <Form.Control
        {...field}
        {...props}
        isInvalid={form.touched[field.name] && !!form.errors[field.name]}
      ></Form.Control>
      <Form.Control.Feedback type="invalid">
        {form.errors[field.name]}
      </Form.Control.Feedback>
    </Form.Group>
  );
};
