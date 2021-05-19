import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { Col, Spinner, Row } from 'react-bootstrap';
import googleMapReact from 'google-map-react';
import {
  FormikHelpers,
  FormikProvider,
  useFormik,
  useFormikContext,
} from 'formik';
import _ from 'lodash';

import styles from './PropertyForm.module.scss';
import { Map, Button, PhotoDropzone } from '../../../../app/components';
import { IPropertyForm, Property } from '../../../../app/models/property';
import {
  getAddressByGeolocation,
  getGeolocationByAddress,
} from '../../../../app/services/googleApi';
import { history } from '../../../../index';
import PropertyCorousel from '../PropertyCorousel/PropertyCorousel';
import PropertyDetails, {
  PropertyFormValues,
} from '../PropertyDetails/PropertyDetails';
import { propertySchema } from '../../validators/propertyValidator';

interface Props {
  property: IPropertyForm;
  onSubmit(
    values: PropertyFormValues,
    files: object[],
    formikHelpers: FormikHelpers<PropertyFormValues>
  ): void;
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
  }, [value, getFieldHelpers, debouncedGetGeolocation]);
  return null;
};

export default function PropertyForm({
  property,
  onSubmit,
}: Props): React.ReactElement<Props> {
  const [files, setFiles] = useState((property as Property).photos || []);

  const formik = useFormik<PropertyFormValues>({
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
    onSubmit: (
      values: PropertyFormValues,
      formikHelpers: FormikHelpers<PropertyFormValues>
    ) => onSubmit(values, files, formikHelpers),
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
    <>
      <Col md="6">
        <PhotoDropzone setFiles={setFiles} files={files} />

        <FormikProvider value={formik}>
          <div className={styles['property-form__controls']}>
            <Button
              disabled={
                formik.isSubmitting || !_.isEmpty((formik as any).errors)
              }
              onClick={() => formik.submitForm()}
              loading={formik.isSubmitting}
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
        </FormikProvider>
      </Col>
      <Col md="6">
        <Map
          className={cx(styles['property-form__map'])}
          onClick={handleMapClick}
          defaultCenter={defaultCoordinates}
          center={coordinates}
          markers={[coordinates]}
        />
      </Col>
    </>
  );
}
