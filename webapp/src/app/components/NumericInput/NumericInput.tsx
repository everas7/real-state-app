import React from 'react';
import { FieldProps } from 'formik';
import { Form } from 'react-bootstrap';
import { IconType } from 'react-icons';
import cx from 'classnames';
import styles from './NumericInput.module.scss';

import MaskedInput, { MaskedInputProps } from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

const defaultMaskOptions = {
  prefix: '$',
  suffix: '',
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ',',
  allowDecimal: true,
  decimalSymbol: '.',
  decimalLimit: 2,
  integerLimit: 7,
  allowNegative: false,
  allowLeadingZeroes: false,
};

interface Props extends Partial<FieldProps> {
  maskOptions: Partial<typeof defaultMaskOptions>;
  icon?: IconType;
  className?: string;
  value: string | number;
  onChange: (e: any) => void;
}

export function NumericInput({
  field,
  form,
  meta,
  maskOptions,
  icon,
  className,
  ...props
}: Props) {
  const currencyMask = createNumberMask({
    ...defaultMaskOptions,
    ...maskOptions,
  });
  return (
    <Form.Group className={cx(styles['numeric-input'], className)}>
      <div className={icon && 'inner-addon left-addon'}>
        <span className="inputicon">{icon}</span>
        <Form.Control
          isInvalid={
            (field?.name &&
              form?.touched[field.name] &&
              !!form?.errors[field?.name]) ||
            false
          }
          as={MaskedInput}
          mask={currencyMask}
          {...field}
          {...props}
        />
        <Form.Control.Feedback
          type="invalid"
          className={styles['numeric-input__invalid-feedback']}
        >
          {field?.name && form?.errors[field?.name]}
        </Form.Control.Feedback>
      </div>
    </Form.Group>
  );
}
