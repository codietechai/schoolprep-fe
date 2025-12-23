import * as yup from 'yup';

export const addRoleSchema = yup
  .object({
    name: yup.string().required('Role Name is required'),
    active: yup.string().required('Active is required'),
  })
  .required();

export const editRoleSchema = yup
  .object({
    name: yup.string().required('Role Name is required'),
    active: yup.string().required('Active is required'),
  })
  .required();
