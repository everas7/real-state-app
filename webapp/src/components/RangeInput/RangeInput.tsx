import React from 'react';
import InputRange, { Range, InputRangeProps } from 'react-input-range';
import './RangeInput.scss';
import styles from './RangeInput.module.scss';

interface Props extends InputRangeProps {
  label?: string;
  labelSuffix?: string;
  labelPrefix?: string;
}

export default function RangeInput({
  label,
  allowSameValues = true,
  labelSuffix = '',
  labelPrefix = '',
  ...props
}: Props): React.ReactElement<Props> {
  return (
    <div className={styles['range-input']}>
      {label && (
        <div className={styles['range-input__label-container']}>
          <div className={styles['range-input__label']}>{label}</div>{' '}
          <div className={styles['range-input__label-values']}>
            {(props.value as Range).min !== undefined ? (
              <span>
                {labelPrefix}
                {(props.value as Range).min.toLocaleString()}
                {labelSuffix} - {labelPrefix}
                {(props.value as Range).max.toLocaleString()}
                {labelSuffix}
              </span>
            ) : (
              `${{ labelPrefix }}${props.value.toLocaleString()}${{
                labelSuffix,
              }}`
            )}
          </div>
        </div>
      )}
      <InputRange allowSameValues={allowSameValues} {...props} />
    </div>
  );
}
