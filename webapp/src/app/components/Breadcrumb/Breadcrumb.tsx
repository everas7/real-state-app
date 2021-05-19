import React from 'react';
import { Breadcrumb as BsBreadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import styles from './Breadcrumb.module.scss';

interface Props {
  items: {
    name: string;
    path?: string;
  }[];
}

export function Breadcrumb({ items }: Props): React.ReactElement<Props> {
  return (
    <BsBreadcrumb className={styles.breadcrumb}>
      {items.map((item, i) =>
        i === items.length - 1 ? (
          <BsBreadcrumb.Item key={`breadcrumb-item ${i}`} active={true}>
            {item.name}
          </BsBreadcrumb.Item>
        ) : (
          <BsBreadcrumb.Item
            key={`breadcrumb-item ${i}`}
            linkAs={() => <Link to={item.path!}> {item.name}</Link>}
          />
        )
      )}
    </BsBreadcrumb>
  );
}
