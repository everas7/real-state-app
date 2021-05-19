import React, { ButtonHTMLAttributes } from 'react';
import cx from 'classnames';

import styles from './IconButton.module.scss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactElement;
  variant?: 'danger';
}

export function IconButton({
  icon,
  className,
  children,
  variant,
  ...props
}: Props): React.ReactElement<Props> {
  return (
    <button
      className={cx(styles['icon-button'], className, {
        [styles['icon-button--danger']]: variant === 'danger',
      })}
      {...props}
    >
      {icon}
      <span className={styles['icon-button__text']}>{children}</span>
    </button>
  );
}
