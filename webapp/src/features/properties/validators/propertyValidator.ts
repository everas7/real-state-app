import * as yup from 'yup';

export const propertySchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .max(70, 'Name must not exceed 70 characters'),
  price: yup.string().required('Price is required'),
  description: yup
    .string()
    .required('Description is required')
    .max(500, 'Name must not exceed 500 characters'),
  rooms: yup.string().required('Rooms is required'),
  floorAreaSize: yup.string().required('Floor area size is required'),
  address: yup
    .string()
    .required('Address is required')
    .max(120, 'Name must not exceed 120 characters'),
  realtorId: yup.string().required('Realtor is required'),
  geolocation: yup.object().shape({
    latitude: yup.number().required(),
    longitude: yup.number().required(),
  }),
});
