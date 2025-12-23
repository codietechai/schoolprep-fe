import * as yup from 'yup';

export const addSubjectSchema = yup.object({
  name: yup.string().required('Subject Name is required'),
  description: yup.string().optional(),
  active: yup.string().required('Status is required'),
});
