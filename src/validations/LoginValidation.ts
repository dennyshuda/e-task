import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email().required("required"),
  password: yup.string().min(5).required("required"),
});
