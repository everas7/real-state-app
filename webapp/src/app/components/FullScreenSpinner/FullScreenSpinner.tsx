import React from 'react';
import { Spinner } from 'react-bootstrap';

import styles from './FullScreenSpinner.module.scss';

interface Props {
  alt?: string;
}

export function FullScreenSpinner({
  alt = 'Loading app...',
}: Props): React.ReactElement<Props> {
  return (
    <div className={styles['full-screen-spinner']}>
      <Spinner
        as="span"
        animation="border"
        role="status"
        aria-hidden="true"
        variant="primary"
      />
      <span className="sr-only">{alt}</span>{' '}
    </div>
  );
}
