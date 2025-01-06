import { ErrorMessage, Form, Field, Formik } from "formik";
import * as Yup from "yup";
import "./Register.css";
import axiosInstance from "../../api/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { endPoints } from "../../api/endPoints";

function Register() {
  const navigate = useNavigate();
  navigate("/login");
  const initialValues = {
    name: "",
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[a-zA-Z ]+$/, "Name can only contain letters and spaces")
      .required("name is required"),
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
    console.log(values)
    try {
      const { confirmpassword, ...payload } = values;
      const response = await axiosInstance.post(
        endPoints.AUTH.REGISTER,
        payload
      );
      console.log(response)
      toast.success(response.data.message);

      resetForm();
      navigate("/login");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    
    <div className="main">
      <div className="signup max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-5 text-center text-[black]">
          Sign up
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={RegisterSubmit}
        >
          <Form>
            <div className="signupform mb-4">
              <Field type="text" placeholder="Name" id="name" name="name" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>
            <div className="signupform  mb-4">
              <Field
                type="text"
                placeholder="Username"
                id="username"
                name="username"
              />
              <ErrorMessage name="username" component="div" className="error" />
            </div>
            <div className="signupform  mb-4">
              <Field type="email" placeholder="Email" id="email" name="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div className="signupform mb-4">
              <Field
                type="password"
                placeholder="Password"
                id="password"
                name="password"
              />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <div className="signupform mb-4">
              <Field
                type="password"
                placeholder="Confirm Password"
                id="confirmpassword"
                name="confirmpassword"
              />
              <ErrorMessage
                name="confirmpassword"
                component="div"
                className="error"
              />
            </div>
            <div className="signupbutn">
              <button type="submit" className="submit-button">
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
