import * as yup from 'yup';

export const TopicsSchema = yup.object({
  title: yup.string().required('title is required'),
  description:yup.string().required('Enter Description'),
  status: yup.string().required('Status is required'),
  icon: yup.string().optional(),
  parent_topic: yup.string().required("Topic is required"),
});

