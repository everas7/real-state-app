import React from 'react';
import {
  Button as BoostrapButton,
  ButtonProps as BoostrapButtonProps,
} from 'react-bootstrap';

export function Button({
  children,
  as: Component = BoostrapButton,
  ...props
}: BoostrapButtonProps): React.ReactElement<BoostrapButtonProps> {
  return <Component {...props}>{children}</Component>;
}
