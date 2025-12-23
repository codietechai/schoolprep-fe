import * as yup from 'yup';

export const addAlgorithmsSchema = yup.object({
  id: yup.number().optional(),
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  long_description: yup.string().required('Long Description is required'),
  developer_name: yup.string().required('Developer Name is required'),
  available_for_trial: yup
    .string()
    .required('Available for free trial is required'),
  image: yup.string().optional(),
  categoryIds: yup.array().required('Categories is required'),
  entry_indicator: yup.array().optional(),
  exit_indicator: yup.array().optional(),
  suggested_stop_loss: yup.string().optional(),
  suggested_take_profit: yup.string().optional(),
  status: yup
    .string()
    .oneOf(
      ['active', 'inactive'],
      "Status must be either 'active' or 'inactive'",
    )
    .required('Status is required'),
  indicator_id: yup.array().required("Indicator is required"),
  stop_loss_start: yup.string().required("From is required"),
  stop_loss_end: yup.string().required("To is required"),
  stop_loss_step: yup.string().required("Step is required"),
  stop_loss_default: yup.string().required("Default is required"),
  take_profit_start: yup.string().required("From is required"),
  take_profit_end: yup.string().required("To is required"),
  take_profit_step: yup.string().required("Step is required"),
  take_profit_default: yup.string().required("Default is required"),
  is_short_long_term: yup.string().required("Field is required"),
});
