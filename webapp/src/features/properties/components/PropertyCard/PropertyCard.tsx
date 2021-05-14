import React from 'react';
import { Card } from 'react-bootstrap';
import styles from './PropertyCard.module.scss';
import { FaBed, FaRulerCombined } from 'react-icons/fa';
import * as Constants from '../../../../constants';

interface Props {
  title: string;
  rooms: number;
  address: string;
  floorAreaSize: number;
  price: number;
}

export default function PropertyCard({
  title,
  rooms,
  address,
  floorAreaSize,
  price,
}: Props): React.ReactElement<Props> {
  return (
    <Card className={styles['property-card']}>
      <Card.Img variant="top" src={Constants.PROPERTY_PLACEHOLDER} />
      <Card.Body>
        <Card.Title>${price}</Card.Title>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{address}</Card.Text>
        <Card.Text>
          {rooms} <FaBed color={Constants.PRIMARY_COLOR} /> | {floorAreaSize} ft
          <sup>2</sup> <FaRulerCombined color={Constants.PRIMARY_COLOR} />
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
