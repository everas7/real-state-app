import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import cx from 'classnames';
import * as Constants from '../../../../app/constants';
import styles from './PropertyCorousel.module.scss';
import { Photo } from '../../../../app/models/property';

interface Props {
  photos: Photo[];
}

export default function PropertyCorousel({
  photos,
}: Props): React.ReactElement<Props> {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  if (!photos.length) {
    return (
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        interval={null}
        className="h100"
      >
        <Carousel.Item key={1}>
          <img
            className={cx('d-block w-100', styles['property-corousel__img'])}
            src={Constants.PROPERTY_PLACEHOLDER}
            alt="Example Slide 1"
          />
        </Carousel.Item>
        <Carousel.Item key={2}>
          <img
            className={cx('d-block w-100', styles['property-corousel__img'])}
            src={Constants.PROPERTY_PLACEHOLDER}
            alt="Example Slide 2"
          />
        </Carousel.Item>
      </Carousel>
    );
  }

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      interval={null}
      className="h100"
    >
      {photos.map((photo) => (
        <Carousel.Item key={photo.id}>
          <img
            src={photo.url}
            alt="Slide"
            className={cx('d-block w-100', styles['property-corousel__img'])}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
