import * as yup from 'yup';

export const planSchema = yup.object().shape({
  name: yup.string().required('Plan name is required'),
  amount: yup.string().required('Amount is required'),
  duration: yup.string().required('Plan duration is required'),
  signal_allowed: yup.string().required('Signal available is required'),
  signal_allowed_for_free_trial: yup
    .string()
    .required('Signal available for free trial is required'),
  algorithm_allowed: yup.string().required('Algorithms available is required'),
  chart_allowed: yup.string().required('Charts available is required'),
  active_chart_allowed: yup.string().required('Active charts is required'),
  additional_signal_allowed: yup
    .boolean()
    .required('Additional signals is required'),
  is_rollover_allowed: yup
    .boolean()
    .required('Signal rollover allowed is required'),
  algorithmIds: yup.array().required('Available algorithms is required'),
  status: yup.string().required('Status is required'),
  paypal_trial_id: yup.string().optional(),
  paypal_regular_id: yup.string().optional(),
});
