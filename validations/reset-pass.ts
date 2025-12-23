import * as yup from "yup";

export const resetSchema = yup
  .object({
    password: yup.string().required("Password is required"),
    repassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  })
  .required();
