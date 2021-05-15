import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import cx from 'classnames';
import * as Constants from '../../../../app/constants';
import styles from './PropertyCorousel.module.scss';

export default function PropertyCorousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      interval={null}
      className="h100"
    >
      <Carousel.Item>
        <img
          src={Constants.PROPERTY_PLACEHOLDER}
          alt="First slide"
          className={cx('d-block w-100', styles['property-corousel__img'])}
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className={cx('d-block w-100', styles['property-corousel__img'])}
          src={Constants.PROPERTY_PLACEHOLDER}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className={cx('d-block w-100', styles['property-corousel__img'])}
          src={Constants.PROPERTY_PLACEHOLDER}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
