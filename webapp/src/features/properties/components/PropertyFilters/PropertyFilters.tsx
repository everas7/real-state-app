import React, { useState } from 'react';
import _ from 'lodash';
import cx from 'classnames';

import { Button, RangeInput } from '../../../../app/components';
import styles from './PropertyFilters.module.scss';
import { Range } from 'react-input-range';
import { IPropertyFilters } from '../../../../app/models/property';
import { useAppDispatch, useAppSelector } from '../../../../app/store/hooks';
import {
  defaultFilters,
  fetchProperties,
  selectFilters,
  setFilters,
  setPage,
} from '../../services/propertiesSlice';

interface Props {
  className?: string;
}

export default function PropertyFilters({
  className,
}: Props): React.ReactElement<Props> {
  const filters = useAppSelector(selectFilters);
  const dispatch = useAppDispatch();

  function handleRoomsFilterChange(value: number) {
    const rooms = new Set(filters.rooms);
    if (rooms.has(value)) {
      rooms.delete(value);
    } else {
      rooms.add(value);
    }
    dispatch(
      setFilters({
        ...filters,
        rooms: new Set(rooms),
      })
    );
  }

  function handleApplyFilter(filtersValues: IPropertyFilters) {
    const filtersToSend: IPropertyFilters = _.cloneDeep({
      ...filtersValues,
      price: {
        min: filtersValues.price.min,
        max: Math.max(filtersValues.price.max!, filtersValues.price.min),
      },
      floorAreaSize: {
        min: filtersValues.floorAreaSize.min,
        max: Math.max(
          filtersValues.floorAreaSize.max!,
          filtersValues.floorAreaSize.min
        ),
      },
    });

    dispatch(
      setFilters({
        ...filters,
        ...filtersToSend,
      })
    );
    dispatch(setPage(1));
    dispatch(fetchProperties());
  }

  function handleReset() {
    dispatch(setFilters(defaultFilters));
    dispatch(fetchProperties());
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
          dispatch(
            setFilters({
              ...filters,
              price: {
                min: Math.max((value as Range).min, defaultFilters.price.min),
                max: Math.min((value as Range).max, defaultFilters.price.max),
              },
            })
          )
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
          dispatch(
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
          )
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
