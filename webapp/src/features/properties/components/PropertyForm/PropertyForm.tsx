import React, { useEffect } from 'react';
import cx from 'classnames';
import { Button, Col, Form, Row } from 'react-bootstrap';
import googleMapReact from 'google-map-react';
import {
  FormikHelpers,
  FormikProvider,
  useFormik,
  useFormikContext,
} from 'formik';

import styles from './PropertyForm.module.scss';
import { Map } from '../../../../app/components';
import {
  IPropertyForm,
  Property,
} from '../../../../app/models/property';
import {
  getAddressByGeolocation,
  getGeolocationByAddress,
} from '../../../../app/services/googleApi';
import { history } from '../../../../index';
import PropertyCorousel from '../PropertyCorousel/PropertyCorousel';
import PropertyDetails from '../PropertyDetails/PropertyDetails';

interface Values extends Omit<IPropertyForm, 'realtorId' | 'available'> {}

interface Props {
  property: Property;
  onSubmit(values: Values, formikHelpers: FormikHelpers<Values>): void;
}

const ManageAddressChange = () => {
  const { getFieldProps, getFieldHelpers } = useFormikContext();
  const value = getFieldProps('address').value;
  useEffect(() => {
    getGeolocationByAddress(value)?.then((res) => {
      getFieldHelpers('geolocation').setValue(res);
    });
  }, [value, getFieldHelpers]);
  return null;
};

export default function PropertyForm({
  property,
  onSubmit,
}: Props): React.ReactElement<Props> {
  const formik = useFormik({
    initialValues: {
      name: property.name,
      price: property.price,
      address: property.address,
      description: property.description,
      rooms: property.rooms,
      floorAreaSize: property.floorAreaSize,
      geolocation: property.geolocation,
    },
    validate: () => ({}),
    onSubmit,
  });

  const coordinate = {
    lat: formik.getFieldProps('geolocation').value.latitude,
    lng: formik.getFieldProps('geolocation').value.longitude,
  };

  function handleMapClick(e: googleMapReact.ClickEventValue) {
    const newGeoLocation = {
      latitude: e.lat,
      longitude: e.lng,
    };
    getAddressByGeolocation(newGeoLocation).then((address) => {
      formik.getFieldHelpers('geolocation').setValue(newGeoLocation);
      formik.getFieldHelpers('address').setValue(address);
    });
  }

  return (
    <Col className={cx(styles['property-form-page__content'])}>
      <Row className={cx('')}>
        <Col md="6">
          <Row>
            <PropertyCorousel />
          </Row>
          <Row className={cx(styles['property-form-page__map'], 'flex-grow-1')}>
            <Map
              onClick={handleMapClick}
              defaultCenter={coordinate}
              center={coordinate}
              markers={[coordinate]}
            />
          </Row>
        </Col>
        <Col md="6" className="flex-grow-1">
          <FormikProvider value={formik}>
            <Form>
              <div className={styles['property-form-page__controls']}>
                <Button onClick={() => formik.submitForm()}>
                  Save Changes
                </Button>
                <Button
                  variant="light"
                  onClick={() => {
                    history.push(`/apartments/${property.id}`);
                  }}
                >
                  Cancel
                </Button>
              </div>
              <PropertyDetails property={property} edit formik={formik} />
              <ManageAddressChange />
            </Form>
          </FormikProvider>
        </Col>
      </Row>
    </Col>
  );
}
