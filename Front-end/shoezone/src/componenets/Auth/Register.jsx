import { ErrorMessage, Form, Field, Formik } from "formik";
import * as Yup from "yup";
import "./Register.css";
import React from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  navigate('/login')
  const initialValues = {
    name: "",
    username: "",
    email: "",
    password: "",
    confirmpassword: ""
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
