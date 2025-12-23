import * as yup from 'yup';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { asyncDebounce } from '@/utils';

const verifyPhone = async (value: string, values: yup.TestContext<any>) => {
  try {
    return await isValidPhoneNumber(value);
  } catch (e) {
    return false;
  }
};

const debounceVerifyPhone = asyncDebounce(verifyPhone, 500);

export const userSchema = yup
  .object({
    role: yup.string().required('Role is required'),
    full_name: yup.string().required('Full Name is required'),
    password: yup.string().optional(),
    email: yup
      .string()
      .email('Please enter a valid email address')
      .required('Email is required'),
    contact_number: yup
      .string()
      .optional()
      .test(
        'phone_number_verified',
        'Please enter a valid phone number',
        async (value, values) => {
          const verified = await debounceVerifyPhone(value as string, values);
          return verified as boolean;
        },
      ),
    status: yup.string().required('Status is required'),
    address: yup.string().optional(),
    profile_photo: yup.string().optional(),
    phone_code: yup.string().optional(),
    country_code: yup.string().required('Country is required'),
    image: yup.string().optional(),
  })
  .required();
