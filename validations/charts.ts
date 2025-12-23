import * as yup from 'yup';

export const addChartSchema = yup
  .object({
    name: yup.string().required('Name is required'),
    active: yup.string().required('Active is required'),
    price: yup.string().required('Price is required'),
    icon: yup.string().optional(),
    category_id: yup.string().optional(),
    recomended: yup.string().required('Recomended is required'),
  })
  .required();

export const addChartCategorySchema = yup
  .object({
    name: yup.string().required('Name is required'),
    active: yup.string().required('Active is required'),
  })
  .required();
