import { ErrorMessage, Form, Field, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("name is required"),
    username: Yup.string().required("username is required"),
    email: Yup.string()
      .email("invalid email format")
      .required("email is required"),
    password: Yup.string()
      .matches(/[A-Z]/, "Password must contain atleast one uppercase letter")
      .matches(/[a-z]/, "Password must contain atleast one lowercase letter")
      .matches(/[0-9]/, "Password must contain atleast one number")
      .matches(
        /[@$!%*?&]/,
        "Password must contain atleast one special character (@, $, !, %, *, ?, &)"
      )
      .min(8, "Password must contain atleast 8 characters")
      .required("password is required"),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password")], "password must match")
      .required("please confirm your password"),
  });
  const RegisterSubmit = async (values, { resetForm }) => {
    try {
      console.log("Form data", values);
      const existingUsername = await axios.get("http://localhost:5000/users", {
        params: { username: values.username },
      });
      if (existingUsername.data.length > 0) {
        toast.success("Username already exists.You can login");
        return;
      }
      if (values.email === "pphaneena02@gmail.com") {
        toast.success("This email already existing.");
        return;
      }
      const existingEmail = await axios.get("http://localhost:5000/users", {
        params: { email: values.email },
      });
      if (existingEmail.data.length > 0) {
        toast.success("Email already exists.Please choose another one");
        return;
      }

      const { confirmpassword, ...userData } = values;

      const response = await axios.post(
        "http://localhost:5000/users",
        userData
      );
      console.log("Registration success", response.data);
      toast.success("Registration successful");
      resetForm();
      navigate("/login");
    } catch (error) {
      console.log("registration failed", error);
      alert("Registration failed.Please try again");
    }
  };

  return (
    <div className="flex items-center justify-center p-32 mt-1">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h3 className="text-xl font-bold text-center mb-4">Sign Up</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={RegisterSubmit}
        >
          <Form>
            <div className="mb-4">
              <Field
                type="text"
                name="name"
                placeholder="Name"
                className="w-full px-3 py-2 border rounded-lg "
              />
              <br />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mb-4">
              <Field
                type="text"
                placeholder="Username"
                className="w-full px-3 py-2 border rounded-lg "
                name="username"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mb-4">
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="w-full px-3 py-2 border rounded-lg "
              />
              <br />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="mb-4">
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="w-full px-3 py-2 border rounded-lg "
              />
              <br />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <Field
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full px-3 py-2 border rounded-lg "
              />
              <br />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="signupbutn">
              <button
                type="submit"
                className="w-60 bg-blue-400 text-white py-2 rounded-lg hover:bg-blue-500 "
              >
                Sign up
              </button>
            </div>
          </Form>
        </Formik>
        <ToastContainer />
      </div>
    </div>
  );
}
export default Register;
