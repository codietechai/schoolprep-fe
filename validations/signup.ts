import * as yup from 'yup';

export const SignupSchema = yup
  .object({
    fullname: yup.string().required('Full Name is required'),
    email: yup
      .string()
      .email('Please enter a valid email address')
      .required('Email is required'),
    password: yup.string().required('Password is required'),
    repassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    is_agreed: yup
      .boolean()
      .oneOf([true], 'You must accept the terms and conditions')
      .required('You must accept the terms and conditions'),
  })
  .required();
