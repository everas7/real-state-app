import React from 'react';

import { Breadcrumb as BsBreadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface Props {
  items: {
    name: string;
    path?: string;
  }[];
}

export default function Breadcrumb({
  items,
}: Props): React.ReactElement<Props> {
  return (
    <BsBreadcrumb>
      {items.map((item, i) =>
        i === items.length - 1 ? (
          <BsBreadcrumb.Item key={`breadcrumb-item ${i}`} active>
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
