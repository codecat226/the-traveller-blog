import React from "react";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { resetPassword } from "../services/userServices";
import { ResetUser } from "../types/types";

export const ResetPassword = () => {
  let { token } = useParams();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values: ResetUser, { resetForm }) => {
      try {
        const res = await resetPassword(values, token);
        toast.success(res.message);
        resetForm({});
        navigate("/login");
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    },
  });

  return (
    <div className="register">
      <ToastContainer />
      <h1>Reset Password:</h1>
      <div className="card">
        <form onSubmit={formik.handleSubmit}>
          <div className="form__section">
            <label htmlFor="password">New Password:</label>
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
            <button type="submit">Reset Password</button>
          </div>
        </form>
      </div>
    </div>
  );
};
