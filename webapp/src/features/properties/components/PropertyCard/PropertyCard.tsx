import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import styles from './PropertyCard.module.scss';
import { FaBed, FaRulerCombined } from 'react-icons/fa';
import * as Constants from '../../../../app/constants';

interface Props {
  title: string;
  rooms: number;
  address: string;
  floorAreaSize: number;
  price: number;
  available: boolean;
}

export default function PropertyCard({
  title,
  rooms,
  address,
  floorAreaSize,
  price,
  available,
}: Props): React.ReactElement<Props> {
  return (
    <Card className={styles['property-card']}>
      <Card.Img variant="top" src={Constants.PROPERTY_PLACEHOLDER} />
      <Card.Body>
        <Card.Title>${price.toLocaleString()}</Card.Title>
        <Card.Title className={styles['property-card__title']}>
          {title}
        </Card.Title>
        <Card.Text className={styles['property-card__address']}>
          {address}
        </Card.Text>
        <div className={styles['property-card__footer']}>
          <Card.Text className={styles['property-card__dimensions']}>
            {rooms} <FaBed color={Constants.PRIMARY_COLOR} /> | {floorAreaSize}{' '}
            ft
            <sup>2</sup> <FaRulerCombined color={Constants.PRIMARY_COLOR} />
          </Card.Text>
          <Badge variant={available ? 'warning' : 'success'}>
            {available ? 'Available' : 'Rented'}
          </Badge>
        </div>
      </Card.Body>
    </Card>
  );
}
