import * as yup from "yup";

export const addTaskSchema = yup.object({
  title: yup.string().required("required"),
  description: yup.string().required("required"),
  duedate: yup.string().required("required"),
  category: yup.string().required("required"),
  users: yup.array().min(1).required("required"),
});
