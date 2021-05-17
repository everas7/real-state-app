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
import _ from 'lodash';

import styles from './PropertyForm.module.scss';
import { Map } from '../../../../app/components';
import { IPropertyForm, Property } from '../../../../app/models/property';
import {
  getAddressByGeolocation,
  getGeolocationByAddress,
} from '../../../../app/services/googleApi';
import { history } from '../../../../index';
import PropertyCorousel from '../PropertyCorousel/PropertyCorousel';
import PropertyDetails from '../PropertyDetails/PropertyDetails';
import { propertySchema } from '../../validators/propertyValidator';
import { User } from '../../../../app/models/user';

interface Values
  extends Omit<IPropertyForm, 'realtorId' | 'available' | 'realtor'> {
  realtorId: number | null;
}

interface Props {
  property: IPropertyForm;
  onSubmit(values: Values, formikHelpers: FormikHelpers<Values>): void;
}

const defaultCoordinates = {
  lat: 40.73061,
  lng: -73.935242,
};

const ManageAddressChange = () => {
  const { getFieldProps, getFieldHelpers } = useFormikContext();
  const value = getFieldProps('address').value;

  const getGeolocation = (address: string) =>
    getGeolocationByAddress(address).then((res) => {
      getFieldHelpers('geolocation').setValue(res);
    });

  const debouncedGetGeolocation = React.useCallback(
    _.debounce(getGeolocation, 500),
    []
  );

  useEffect(() => {
    debouncedGetGeolocation(value);
  }, [value, getFieldHelpers]);
  return null;
};

export default function PropertyForm({
  property,
  onSubmit,
}: Props): React.ReactElement<Props> {
  const formik = useFormik<Values>({
    initialValues: {
      name: property.name,
      price: property.price,
      address: property.address,
      description: property.description,
      rooms: property.rooms,
      floorAreaSize: property.floorAreaSize,
      geolocation: property.geolocation,
      realtorId: property.realtorId || null,
    },
    validationSchema: propertySchema,
    onSubmit,
  });

  const geolocationFieldValue = formik.getFieldProps('geolocation').value;
  const coordinates = geolocationFieldValue
    ? {
        lat: geolocationFieldValue.latitude,
        lng: geolocationFieldValue.longitude,
      }
    : defaultCoordinates;

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
              defaultCenter={coordinates}
              center={coordinates}
              markers={[coordinates]}
            />
          </Row>
        </Col>
        <Col md="6" className="flex-grow-1">
          <FormikProvider value={formik}>
            <Form>
              <div className={styles['property-form-page__controls']}>
                <Button
                  disabled={!_.isEmpty((formik as any).errors)}
                  onClick={() => formik.submitForm()}
                >
                  {property.id ? 'Save Changes' : 'Create Apartment'}
                </Button>
                <Button
                  variant="light"
                  onClick={() => {
                    history.push(`/apartments/${property.id || ''}`);
                  }}
                >
                  Cancel
                </Button>
              </div>
              <PropertyDetails
                property={property as Property}
                edit={true}
                formik={formik}
              />
              <ManageAddressChange />
            </Form>
          </FormikProvider>
        </Col>
      </Row>
    </Col>
  );
}
