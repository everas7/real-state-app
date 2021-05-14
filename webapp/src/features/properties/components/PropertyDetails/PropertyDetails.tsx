import React from 'react';
import { FaBed, FaRulerCombined } from 'react-icons/fa';
import { Property } from '../../models/property';
import styles from './PropertyDetails.module.scss';
import * as Constants from '../../../../constants';

interface Props {
  property: Property;
}

export default function PropertyDetails({
  property,
}: Props): React.ReactElement<Props> {
  return (
    <div className={styles['property-details']}>
      <div className={styles['property-details__name']}>{property.name}</div>
      <div className={styles['property-details__price']}>${property.price}</div>
      <div className={styles['property-details__address']}>
        {property.address}
      </div>
      <div className={styles['property-details__dimensions']}>
        <div>
          <FaBed color={Constants.PRIMARY_COLOR} /> {property.rooms} Rooms
        </div>
        <div>
          <FaRulerCombined color={Constants.PRIMARY_COLOR} />
          {property.floorAreaSize} ft<sup>2</sup>
        </div>
      </div>
      <div className={styles['property-details__description']}>
        Description
        <div>{property.description}</div>
      </div>
      <div className={styles['property-details__realtor']}>
        Contact Information
        <div>{property.realtor.name}</div>
        <div>{property.realtor.email}</div>
      </div>
    </div>
  );
}
