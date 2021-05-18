import React, { useState } from 'react';
import _ from 'lodash';
import cx from 'classnames';

import { Button, RangeInput } from '../../../../app/components';
import styles from './PropertyFilters.module.scss';
import { Range } from 'react-input-range';

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
  className?: string;
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
  className,
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
    params.append('filters[minPrice]', String(filtersToSend.price.min));
    if (filtersToSend.price!.max !== defaultFilters.price.max) {
      params.append('filters[maxPrice]', String(filtersToSend.price.max));
    }
    params.append(
      'filters[minFloorAreaSize]',
      String(filtersToSend.floorAreaSize.min)
    );
    if (filtersToSend.floorAreaSize!.max !== defaultFilters.floorAreaSize.max) {
      params.append(
        'filters[maxFloorAreaSize]',
        String(filtersToSend.floorAreaSize.max)
      );
    }
    Array.from(filtersToSend.rooms).forEach((room) => {
      params.append('filters[rooms][]', String(room));
    });
    onApplyFilter(params);
  }

  function handleReset() {
    setFilters(defaultFilters);
    handleApplyFilter(defaultFilters);
  }

  return (
    <div className={cx(styles['property-filters'], className)}>
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
            price: {
              min: Math.max((value as Range).min, defaultFilters.price.min),
              max: Math.min((value as Range).max, defaultFilters.price.max),
            },
          })
        }
        minLabelPrefix="$"
        maxLabelPrefix="$"
        maxLabelSuffix={`${
          filters.price.max === defaultFilters.price.max ? '+' : ''
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
            floorAreaSize: {
              min: Math.max(
                (value as Range).min,
                defaultFilters.floorAreaSize.min
              ),
              max: Math.min(
                (value as Range).max,
                defaultFilters.floorAreaSize.max
              ),
            },
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
