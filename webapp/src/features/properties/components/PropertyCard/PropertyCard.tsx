import React from 'react';
import { Card } from 'react-bootstrap';
import './PropertyCard.scss';
import {FaBed, FaRulerCombined} from 'react-icons/fa'

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
    <Card
      style={{ width: '18rem', }}
      className="property-card"
    >
      <Card.Img
        variant="top"
        src="https://assets-us-01.kc-usercontent.com/28e7bd12-5b30-009d-524e-785407f8bd6e/b1d5e71f-9c8d-4398-be2a-80a2ebaf7832/Apartment-Living-Placeholder.png?w=600&h=400&fit=crop"
      />
      <Card.Body>
        <Card.Title>${price}</Card.Title>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{address}</Card.Text>
        <Card.Text>
          {rooms} <FaBed color="#3eb49e"/> | {floorAreaSize} ft<sup>2</sup> <FaRulerCombined color="#3eb49e"/>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
