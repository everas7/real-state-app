import * as yup from 'yup';

export const propertySchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  price: yup.string().required('Price is required').min(0),
  description: yup.string().required('Description is required'),
  rooms: yup.string().required('Rooms is required'),
  floorAreaSize: yup.string().required('Floor area size is required'),
  address: yup.string().required('Address is required'),
  realtorId: yup.string().required('Realtor is required'),
  geolocation: yup.object().shape({
    latitude: yup.number().required(),
    longitude: yup.number().required(),
  }),
});
