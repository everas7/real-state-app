import React from 'react';
import { Form, FormControlProps } from 'react-bootstrap';
import { FieldProps } from 'formik';
import styles from './Input.module.scss';
import cx from 'classnames';
import { IconType } from 'react-icons';

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
      <div className={icon && 'inner-addon left-addon'}>
        <span className="glyphicon">{icon}</span>
        <Form.Control
          {...field}
          {...props}
          isInvalid={form?.touched[field.name] && !!form?.errors[field.name]}
        />
      </div>
      <Form.Control.Feedback type="invalid">
        {form?.errors[field.name]}
      </Form.Control.Feedback>
    </Form.Group>
  );
};
