import * as yup from 'yup';
import { Role } from '../../../app/models/role';

export const userCreateSchema = yup.object().shape({
  name: yup
    .string()
    .required('Full name is required')
    .max(255, 'Full name must not exceed 255 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Email must be valid')
    .max(255, 'Email must not exceed 255 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-zA-Z]/, { message: 'Password must have at least one letter' })
    .matches(/\d/, { message: 'Password must have at least one number' })
    .max(255, 'Password must not exceed 255 characters'),
  role: yup
    .number()
    .required('Role is required')
    .test(
      'valid-role',
      'Selected value is not a valid role',
      (value, context) =>
        value === Role.Client || value === Role.Admin || value === Role.Realtor
    ),
});

export const userUpdateSchema = yup.object().shape({
  name: yup
    .string()
    .required('Full name is required')
    .max(255, 'Full name must not exceed 255 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Email must be valid')
    .max(255, 'Email must not exceed 255 characters'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-zA-Z]/, { message: 'Password must have at least one letter' })
    .matches(/\d/, { message: 'Password must have at least one number' })
    .max(255, 'Password must not exceed 255 characters'),
  role: yup
    .number()
    .required('Role is required')
    .test(
      'valid-role',
      'Selected value is not a valid role',
      (value, context) =>
        value === Role.Client || value === Role.Admin || value === Role.Realtor
    ),
});
