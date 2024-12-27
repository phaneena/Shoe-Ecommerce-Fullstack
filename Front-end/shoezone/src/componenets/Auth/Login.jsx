// import { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from '../../api/axiosInstance'
import { endPoints } from "../../api/endPoints";
import { toast, ToastContainer } from "react-toastify";
// import { productcontext } from "../../Context/Admincontext";

function Login() {
  const navigate = useNavigate();
  // const { setLogged } = useContext(productcontext);
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be atleast 8 characters")
      .required("Password is required"),
  });

  const onSubmit = async (values,{resetForm}) => {
    try{
      const response=await axiosInstance.post(endPoints.AUTH.LOGIN,values)
      console.log(response)
      const userRole=response.data.user.isAdmin ?'admin':'user'
      console.log(userRole)
      localStorage.setItem('user',JSON.stringify(response.data.user))
      navigate(userRole==='admin'?'/admin':'/')
      resetForm()
      toast.success(response.data.message)
    }
    catch(error){
      const errorMessage=error.response?.data?.message ||'Something went wrong.Please try again'
      toast.error(errorMessage)
    }
  };

  return (
    <div className="login-main">
      <div className="login">
        <h1 className="text-3xl font-bold mb-5 text-center">Log in</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            {/* Email field */}
            <div className="loginform mb-4">
              <Field type="email" id="email" name="email" placeholder="Email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            {/* Password field */}
            <div className="loginform mb-4">
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Password"
              />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            {/* Submit button */}
            <div className="loginbutn mb-4">
              <button type="submit" className="submit-button">
                Login
              </button>
            </div>
            <div className="register-link mt-3">
              <p>
                Don't have an account?
                <br />
                <Link to="/register" className="sign-up-link">
                  Register
                </Link>
              </p>
            </div>
          </Form>
        </Formik>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
