import React from 'react';
import { Card, Badge, Row, Col } from 'react-bootstrap';
import cx from 'classnames';

import styles from './PropertyCard.module.scss';
import { FaBed, FaRulerCombined } from 'react-icons/fa';
import * as Constants from '../../../../app/constants';
import { AuthorizedComponent } from '../../../../app/authorization/AuthorizedComponent';
import { Permissions } from '../../../../app/authorization/permissions';

interface Props {
  title: string;
  rooms: number;
  address: string;
  floorAreaSize: number;
  price: number;
  available: boolean;
  onClick?(): void;
  column?: boolean;
}

export default function PropertyCard({
  title,
  rooms,
  address,
  floorAreaSize,
  price,
  available,
  onClick,
  column = false,
}: Props): React.ReactElement<Props> {
  return (
    <Card className={styles['property-card']} onClick={onClick}>
      <Card.Body as={Row} className="">
        <Col
          md={column ? '12' : '6'}
          className={cx('mb-3 mb-md-0', { 'mb-md-3': column })}
        >
          <Card.Img variant="top" src={Constants.PROPERTY_PLACEHOLDER} />
        </Col>
        <Col md={column ? '12' : '6'} className="d-flex flex-column">
          <Card.Title className={styles['property-card__price']}>
            ${price.toLocaleString()}
          </Card.Title>
          <Card.Title className={styles['property-card__title']}>
            {title}
          </Card.Title>
          <Card.Text className={styles['property-card__address']}>
            {address}
          </Card.Text>

          <div className={cx(styles['property-card__footer'], 'mt-auto')}>
            <Card.Text className={styles['property-card__dimensions']}>
              <span>
                {rooms} <FaBed color={Constants.PRIMARY_COLOR} />
              </span>
              <span className={styles['property-card__dimensions-divider']}>
                |
              </span>
              <span>
                {floorAreaSize} ft
                <sup>2</sup> <FaRulerCombined color={Constants.PRIMARY_COLOR} />
              </span>
            </Card.Text>
            <AuthorizedComponent
              rolesAllowed={Permissions.Properties.List.Availability}
            >
              <Badge variant={available ? 'warning' : 'success'}>
                {available ? 'Available' : 'Rented'}
              </Badge>
            </AuthorizedComponent>
          </div>
        </Col>
      </Card.Body>
    </Card>
  );
}
