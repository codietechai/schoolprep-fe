import * as yup from "yup";

export const addIndicatorSchema = yup
  .object({
    name: yup.string().required("Name is required"),
    time_period_start: yup.string().required("From is required"),
    time_period_end: yup.string().required("To is required"),
    time_period_step: yup.string().required("Step is required"),
    time_period_default: yup.string().required("Default is required"),
    overbought_threshold_start: yup.string().required("From is required"),
    overbought_threshold_end: yup.string().required("To is required"),
    overbought_threshold_step: yup.string().required("Step is required"),
    overbought_threshold_default: yup.string().required("Default is required"),
    oversold_threshold_start: yup.string().required("From is required"),
    oversold_threshold_end: yup.string().required("To is required"),
    oversold_threshold_step: yup.string().required("Step is required"),
    oversold_threshold_default: yup.string().required("Default is required"),
    intervals: yup.array().required("Interval is required"),
    default_interval: yup.string().required("Default interval is required"),
  })
  .required();
