import React from 'react';
import {
  Button as BoostrapButton,
  ButtonProps as BoostrapButtonProps,
} from 'react-bootstrap';
import cx from 'classnames';
import styles from './Button.module.scss';

interface Props extends BoostrapButtonProps {
  float?: boolean;
}
export function Button({
  children,
  as: Component = BoostrapButton,
  float = false,
  ...props
}: Props): React.ReactElement<Props> {
  return (
    <Component
      {...props}
      className={cx({ [styles['button-float']]: float }, props.className)}
    >
      {children}
    </Component>
  );
}
