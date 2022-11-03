import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { setLoggedIn } from "../features/loginSlice";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      // alert(JSON.stringify(values, null, 2));
      try {
        const res = await axios.post(
          "http://localhost:3007/api/users/login",
          values
        );
        console.log(res);
        // const cookie = res.data.token;
        // set the token into the store so it can be used in the rest of the project
        dispatch(setLoggedIn(true));
        resetForm({});
        navigate("/profile");
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="register">
      <h1>Login:</h1>
      <div className="card">
        <form onSubmit={formik.handleSubmit}>
          <div className="form__section">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" {...formik.getFieldProps("email")} />
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="form__section">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="form__section">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};
