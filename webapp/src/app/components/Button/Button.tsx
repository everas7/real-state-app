import React from 'react';
import {
  Button as BoostrapButton,
  ButtonProps as BoostrapButtonProps,
} from 'react-bootstrap';

interface Props extends BoostrapButtonProps {}

export function Button({
  children,
  as: Component = BoostrapButton,
  ...props
}: Props): React.ReactElement<Props> {
  return <Component {...props}>{children}</Component>;
}
