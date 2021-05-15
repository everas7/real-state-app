import React, { useState } from 'react';
import Button from '../../../../components/Button/Button';
import RangeInput from '../../../../components/RangeInput/RangeInput';
import styles from './PropertyFilters.module.scss';

export interface PropertyFiltersValues {
  price: {
    min: number;
    max: number;
  };
  floorAreaSize: {
    min: number;
    max: number;
  };
  rooms: Set<number>;
}

interface Props {
  onApplyFilter: (value: PropertyFiltersValues) => void;
}

export default function PropertyFilters({
  onApplyFilter,
}: Props): React.ReactElement<Props> {
  const [filters, setFilters] = useState({
    price: {
      min: 0,
      max: 20000,
    },
    floorAreaSize: {
      min: 0,
      max: 200,
    },
    rooms: new Set<number>(),
  });

  function handleRoomsFilterChange(value: number) {
    const rooms = new Set(filters.rooms);
    if (rooms.has(value)) {
      rooms.delete(value);
    } else {
      rooms.add(value);
    }
    setFilters({
      ...filters,
      rooms: new Set(rooms),
    });
  }

  return (
    <div className={styles['property-filters']}>
      <div className={styles['property-filters__controls']}>
        <Button onClick={() => onApplyFilter(filters)}> Apply </Button>
        <Button variant="light"> Reset </Button>
      </div>

      <RangeInput
        label="Price"
        value={filters.price}
        minValue={0}
        maxValue={2000}
        onChange={(value) =>
          setFilters({
            ...filters,
            price: value as any,
          })
        }
        labelPrefix="$"
      />
      <RangeInput
        label="Size"
        value={filters.floorAreaSize}
        minValue={0}
        maxValue={200}
        onChange={(value) =>
          setFilters({
            ...filters,
            floorAreaSize: value as any,
          })
        }
        labelSuffix=" ft²"
      />
      <div className={styles['property-filters__rooms']}>
        <div className={styles['property-filters__rooms-label']}>Rooms</div>
        <div className={styles['property-filters__rooms-buttons']}>
          <Button
            variant={filters.rooms.has(1) ? 'primary' : 'light'}
            onClick={() => handleRoomsFilterChange(1)}
          >
            1
          </Button>
          <Button
            variant={filters.rooms.has(2) ? 'primary' : 'light'}
            onClick={() => handleRoomsFilterChange(2)}
          >
            2
          </Button>
          <Button
            variant={filters.rooms.has(3) ? 'primary' : 'light'}
            onClick={() => handleRoomsFilterChange(3)}
          >
            3
          </Button>
          <Button
            variant={filters.rooms.has(4) ? 'primary' : 'light'}
            onClick={() => handleRoomsFilterChange(4)}
          >
            4+
          </Button>
        </div>
      </div>
    </div>
  );
}
