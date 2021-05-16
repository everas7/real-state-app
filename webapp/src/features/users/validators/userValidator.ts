import * as yup from 'yup';

export const userCreateSchema = yup.object().shape({
  name: yup.string().required('Full name is required'),
  email: yup
    .string()
    .required('Email is required')
    .email('Email must be valid'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-zA-Z]/, { message: 'Password must have at least one letter' })
    .matches(/\d/, { message: 'Password must have at least one number' }),
  role: yup.string().required(),
});

export const userUpdateSchema = yup.object().shape({
  name: yup.string().required('Full name is required'),
  email: yup
    .string()
    .required('Email is required')
    .email('Email must be valid'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-zA-Z]/, { message: 'Password must have at least one letter' })
    .matches(/\d/, { message: 'Password must have at least one number' }),
  role: yup.string().required(),
});
