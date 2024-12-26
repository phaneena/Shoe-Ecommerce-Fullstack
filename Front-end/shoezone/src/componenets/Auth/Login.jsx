import { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { productcontext } from "../../Context/Admincontext";

function Login() {
  const navigate = useNavigate();
  const { setLogged } = useContext(productcontext);
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

  const onSubmit = async (values) => {
    try {
      if (
        values.email === "pphaneena02@gmail.com" &&
        values.password === "Haneena@321P"
      ) {
        setLogged(true);
        navigate("/admin");
      } else {
        const response = await axios.get("http://localhost:5000/users");
        console.log(response);

        const user = response.data.find(
          (val) =>
            val.email === values.email && val.password === values.password
        );

        if (user) {
          if (!user.status) {
            toast.error("You are blocked");
            return;
          }
          localStorage.setItem("id", user.id);
          localStorage.setItem("name", user.name);
          navigate("/");
        } else {
          toast.success("invalid email and password");
        }
      }
    } catch (error) {
      console.log("login error", error);
      toast.success("An error occur.Please try again");
    }
  };

  return (
    <div className="login max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
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
  );
}

export default Login;
