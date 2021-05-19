import React, { useState } from 'react';
import InputRange, { Range, InputRangeProps } from 'react-input-range';
import { FaCheck, FaPen } from 'react-icons/fa';

import './RangeInput.scss';
import styles from './RangeInput.module.scss';
import { NumericInput } from '../NumericInput/NumericInput';
import { IconButton } from '..';

interface Props extends InputRangeProps {
  label?: string;
  allowManualInput?: boolean;
  labelSuffix?: string;
  labelPrefix?: string;
  minLabelSuffix?: string;
  minLabelPrefix?: string;
  maxLabelSuffix?: string;
  maxLabelPrefix?: string;
}

export function RangeInput({
  label,
  allowSameValues = true,
  labelSuffix = '',
  labelPrefix = '',
  minLabelSuffix = '',
  minLabelPrefix = '',
  maxLabelSuffix = '',
  maxLabelPrefix = '',
  allowManualInput = true,
  ...props
}: Props): React.ReactElement<Props> {
  const [edit, setEdit] = useState(false);

  function renderEditButton() {
    return allowManualInput ? (
      <IconButton
        onClick={() => {
          setEdit(!edit);
          props.onChange({
            min: (props.value as Range).min,
            max: Math.max(
              (props.value as Range).max!,
              (props.value as Range).min!
            ),
          });
        }}
        icon={edit ? <FaCheck /> : <FaPen />}
      />
    ) : (
      ''
    );
  }

  function renderLabelValues() {
    return (props.value as Range).min !== undefined ? (
      <span>
        <>
          {minLabelPrefix}
          {(props.value as Range).min.toLocaleString()}
          {minLabelSuffix}
        </>{' '}
        -{' '}
        <>
          {maxLabelPrefix}
          {(props.value as Range).max.toLocaleString()}
          {maxLabelSuffix}
        </>
      </span>
    ) : (
      `${{ labelPrefix }}${props.value.toLocaleString()}${{
        labelSuffix,
      }}`
    );
  }

  function renderManualControls() {
    return edit ? (
      <>
        <NumericInput
          value={(props.value as Range).min}
          onChange={(e: any) =>
            props.onChange({
              min: Math.min(
                +e.target.value.replace(/\D+/g, ''),
                (props.value as Range).max!
              ),
              max: (props.value as Range).max,
            })
          }
          maskOptions={{
            allowDecimal: false,
            prefix: minLabelPrefix,
            suffix: minLabelSuffix,
          }}
        />
        <span className={styles['range-input__manual-controls-divider']}>
          -
        </span>
        <NumericInput
          value={(props.value as Range).max}
          onChange={(e: any) =>
            props.onChange({
              max: Math.min(
                e.target.value.replace(/\D+/g, ''),
                props.maxValue!
              ),
              min: (props.value as Range).min,
            })
          }
          maskOptions={{
            allowDecimal: false,
            prefix: maxLabelPrefix,
            suffix: maxLabelSuffix,
          }}
        />
      </>
    ) : (
      ''
    );
  }

  return (
    <div className={styles['range-input']}>
      {label && (
        <>
          <div className={styles['range-input__label-container']}>
            <div className={styles['range-input__label']}>{label}</div>{' '}
            <div className={styles['range-input__label-values']}>
              {renderEditButton()}
              {renderLabelValues()}
            </div>
          </div>
          <div className={styles['range-input__manual-controls']}>
            {renderManualControls()}
          </div>
        </>
      )}
      <InputRange allowSameValues={allowSameValues} {...props} />
    </div>
  );
}
