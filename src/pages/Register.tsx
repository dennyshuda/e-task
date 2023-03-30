import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { registerSchema } from "../validations/RegisterValidation";
import useRegister from "../hooks/UseRegister";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface InitialValues {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
  file: File | null;
}

export default function Register() {
  const register = useRegister();
  const {
    handleSubmit,
    handleChange,
    values,
    setFieldValue,
    errors,
    isSubmitting,
    isValid,
  } = useFormik({
    initialValues: {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
      file: null,
    } as InitialValues,
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      await register(
        values.email,
        values.password,
        values.file,
        values.displayName
      );
    },
  });
  return (
    <div className="grid place-items-center mt-10 w-full">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="p-5 border-[1px] border-gray-400 rounded-md w-4/12">
        <h1 className="font-bold text-3xl text-center text-blue-700">
          Register
        </h1>
        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
          <div>
            <input
              type="text"
              name="displayName"
              placeholder="Display Name"
              className="w-full input-auth"
              onChange={handleChange}
              value={values.displayName}
            />
            {errors.displayName ? (
              <span className="error-message">{errors.displayName}</span>
            ) : (
              ""
            )}
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full input-auth"
              onChange={handleChange}
              value={values.email}
            />
            {errors.email ? (
              <span className="error-message">{errors.email}</span>
            ) : (
              ""
            )}
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full input-auth"
              onChange={handleChange}
              value={values.password}
            />
            {errors.password ? (
              <span className="error-message">{errors.password}</span>
            ) : (
              ""
            )}
          </div>
          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full input-auth"
              onChange={handleChange}
              value={values.confirmPassword}
            />
            {errors.confirmPassword ? (
              <span className="error-message">{errors.confirmPassword}</span>
            ) : (
              ""
            )}
          </div>
          <div>
            <h1 className="font-medium mb-2">Photo Profile</h1>
            <input
              name="file"
              type="file"
              accept="image/png, image/jpg, image/jpeg"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setFieldValue("file", event.currentTarget.files?.[0]);
              }}
            />
            {errors.file ? (
              <span className="error-message">{errors.file}</span>
            ) : (
              ""
            )}
          </div>
          <span>
            Sudah punya akun?{" "}
            <Link to={"/login"} className="text-blue-500">
              Login
            </Link>
          </span>
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`${
              isValid || isSubmitting ? " bg-blue-700" : "bg-blue-400"
            } btn`}
          >
            {isSubmitting ? "Please wait" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
