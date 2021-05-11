import React from 'react';
import { Form, FormControlProps } from 'react-bootstrap';
import { FieldProps } from 'formik';
import './Input.scss';

interface Props extends FormControlProps, FieldProps {}

export const Input: React.FC<Props> = ({ field, form, meta, ...props }) => {
  return (
    <Form.Group className="form-input">
      <Form.Control {...field} {...props}></Form.Control>
    </Form.Group>
  );
};
