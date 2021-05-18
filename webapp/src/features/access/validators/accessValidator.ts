import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Email must be valid'),
  password: yup.string().required('Password is required'),
});

export const signupSchema = yup.object().shape({
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
});
