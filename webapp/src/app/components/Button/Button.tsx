import React from 'react';
import {
  Button as BoostrapButton,
  ButtonProps as BoostrapButtonProps,
  Spinner,
} from 'react-bootstrap';
import cx from 'classnames';
import styles from './Button.module.scss';

interface Props extends BoostrapButtonProps {
  float?: boolean;
  loading?: boolean;
}

export function Button({
  children,
  as: Component = BoostrapButton,
  float = false,
  loading = false,
  ...props
}: Props): React.ReactElement<Props> {
  return (
    <Component
      {...props}
      className={cx({ [styles['button-float']]: float }, props.className)}
    >
      {loading ? (
        <>
          <Spinner
            className={styles.button__spinner}
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          <span className="sr-only">Saving...</span>{' '}
        </>
      ) : (
        ''
      )}
      {children}
    </Component>
  );
}
