import React from 'react';
import { IMaskInput } from 'react-imask';
import { FieldProps } from 'formik';
import { Form } from 'react-bootstrap';
import { IconType } from 'react-icons';
import cx from 'classnames';
import styles from './MaskInput.module.scss';

interface Props extends FieldProps {
  mask: string;
  radix?: string;
  thousandsSeparator?: string;
  value: string;
  unmask?: boolean | 'typed';
  placeholder?: string;
  onChange(value: string): void;
  icon?: IconType;
  className?: string;
}

export function MaskInput({
  field,
  form,
  meta,
  radix = '.',
  thousandsSeparator = ',',
  unmask = true,
  value,
  icon,
  className,
  onChange,
  ...props
}: Props) {
  return (
    <Form.Group className={cx(styles['mask-input'], className)}>
      <div className={icon && 'inner-addon left-addon'}>
        <span className="glyphicon">{icon}</span>
        <Form.Control
          isInvalid={form?.touched[field.name] && !!form?.errors[field.name]}
          as={IMaskInput}
          radix={radix}
          thousandsSeparator={thousandsSeparator}
          unmask={unmask}
          className="form-control"
          onAccept={(maskedValue: string) => onChange(maskedValue)}
          {...field}
          {...props}
          value={String(value)}
        />
        <Form.Control.Feedback type="invalid">
          {form?.errors[field.name]}
        </Form.Control.Feedback>
      </div>
    </Form.Group>
  );
}
