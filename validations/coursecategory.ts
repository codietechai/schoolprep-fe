import * as Yup from 'yup';

export const addCategorySchema = Yup.object({
  name: Yup.string().trim().required('Category name is required'),
  description: Yup.string().nullable().optional(),
  parent_category: Yup.string().optional(),
  active: Yup.string()
    // .oneOf(['true', 'false'], 'Status must be Active or Inactive')
    .required('Status is required'),
});
