import * as yup from "yup";

export const registerSchema = yup.object({
  displayName: yup.string().required("required"),
  email: yup.string().email().required("required"),
  password: yup.string().min(5).required("required"),
  confirmPassword: yup
    .string()
    .min(5)
    .required("required")
    .oneOf([yup.ref("password")], "Password must match"),
  file: yup.mixed().required("required"),
});
