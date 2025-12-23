import * as yup from 'yup';

export const addCourseSchema = yup.object().shape({
  name: yup.string().required('Course name is required'),
  description: yup.string().optional(),
  category: yup.string().required('Category is required'),
  level: yup.string().required('Level is required'),

  active: yup.boolean().required('Status is required'),
  subjects: yup
    .array()
    .of(yup.string().required('Subject name is required'))
    .min(1, 'At least one subject is required')
    .required('Subjects are required'),
});
