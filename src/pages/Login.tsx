import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { loginSchema } from "../validations/LoginValidation";
import useLogin from "../hooks/useLogin";

interface InitialValues {
  email: string;
  password: string;
}

export default function Login() {
  const login = useLogin();
  const { handleSubmit, handleChange, values, errors, isSubmitting, isValid } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      } as InitialValues,
      validationSchema: loginSchema,
      onSubmit: async (values) => {
        await login(values.email, values.password);
      },
    });
  return (
    <div className="grid place-items-center mt-32 w-full">
      <div className="p-5 border-[1px] border-gray-400 rounded-md w-4/12">
        <h1 className="font-bold text-3xl text-center text-blue-700">Login</h1>
        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
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
          <span>
            Belum punya akun?{" "}
            <Link to={"/register"} className="text-blue-500">
              Register
            </Link>
          </span>
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`${
              isValid || isSubmitting ? " bg-blue-700" : "bg-blue-400"
            } btn`}
          >
            {isSubmitting ? "Please wait" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
