import React, { useState } from 'react';
import _ from 'lodash';

import { Button, RangeInput } from '../../../../app/components';
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
  onApplyFilter: (value: URLSearchParams) => void;
}

const defaultFilters = {
  price: {
    min: 0,
    max: 20000,
  },
  floorAreaSize: {
    min: 0,
    max: 7000,
  },
  rooms: new Set<number>(),
};

export default function PropertyFilters({
  onApplyFilter,
}: Props): React.ReactElement<Props> {
  const [filters, setFilters] = useState<PropertyFiltersValues>(defaultFilters);

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

  function handleApplyFilter(filtersValues: PropertyFiltersValues) {
    const filtersToSend: PropertyFiltersValues = _.cloneDeep(filtersValues);
    const params = new URLSearchParams();
    params.append('filters[minPrice]', String(filters.price.min));
    if (filtersToSend.price!.max !== defaultFilters.price.max) {
      params.append('filters[maxPrice]', String(filters.price.max));
    }
    params.append(
      'filters[minFloorAreaSize]',
      String(filters.floorAreaSize.min)
    );
    if (filtersToSend.floorAreaSize!.max !== defaultFilters.floorAreaSize.max) {
      params.append(
        'filters[maxFloorAreaSize]',
        String(filters.floorAreaSize.max)
      );
    }
    Array.from(filters.rooms).forEach((room) => {
      params.append('filters[rooms][]', String(room));
    });
    onApplyFilter(params);
  }

  function handleReset() {
    setFilters(defaultFilters);
    handleApplyFilter(defaultFilters);
  }

  return (
    <div className={styles['property-filters']}>
      <div className={styles['property-filters__controls']}>
        <Button onClick={() => handleApplyFilter(filters)}> Apply </Button>
        <Button variant="light" onClick={handleReset}>
          Reset
        </Button>
      </div>

      <RangeInput
        label="Price"
        value={filters.price}
        minValue={defaultFilters.price.min}
        maxValue={defaultFilters.price.max}
        onChange={(value) =>
          setFilters({
            ...filters,
            price: value as any,
          })
        }
        minLabelPrefix="$"
        maxLabelPrefix="$"
        maxLabelSuffix={`${
          filters.floorAreaSize.max === defaultFilters.floorAreaSize.max
            ? '+'
            : ''
        }`}
      />
      <RangeInput
        label="Size"
        value={filters.floorAreaSize}
        minValue={defaultFilters.floorAreaSize.min}
        maxValue={defaultFilters.floorAreaSize.max}
        onChange={(value) =>
          setFilters({
            ...filters,
            floorAreaSize: value as any,
          })
        }
        minLabelSuffix=" ft²"
        maxLabelSuffix={`${
          filters.floorAreaSize.max === defaultFilters.floorAreaSize.max
            ? '+'
            : ''
        } ft²`}
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
