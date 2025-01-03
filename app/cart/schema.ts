import * as yup from 'yup';

const schema = yup
  .object({
    name: yup
      .string()
      .required('First name is required')
      .min(2, 'First name must be at least 2 characters')
      .max(50, 'First name cannot be longer than 50 characters'),
    surname: yup
      .string()
      .required('Last name is required')
      .min(2, 'Last name must be at least 2 characters')
      .max(50, 'Last name cannot be longer than 50 characters'),
    number: yup
      .string()
      .required('Phone number is required')
      .matches(/^\d+$/, 'Phone number must be numeric')
      .min(10, 'Phone number must be at least 10 digits')
      .max(15, 'Phone number cannot be longer than 15 digits'),
    email: yup
      .string()
      .required('Email is required')
      .email('Invalid email address')
      .max(100, 'Email cannot be longer than 100 characters'),
    voucher: yup
      .string()
      .max(20, 'Voucher code cannot be longer than 20 characters'),
    comments: yup
      .string()
      .max(500, 'Comments cannot be longer than 500 characters'),
  })
  .required();

export default schema;
