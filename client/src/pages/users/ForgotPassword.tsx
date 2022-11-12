import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { forgotPassword } from "../../services/userServices";
import { ForgotUser } from "../../types/types";

export const ForgotPassword = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: async (values: ForgotUser, { resetForm }) => {
      try {
        const res = await forgotPassword(values);
        // set the token into the store so it can be used in the rest of the project
        toast.success(res.message);
        resetForm({});
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    },
  });

  return (
    <div className="form">
      <ToastContainer />
      <h1>Forgot Password:</h1>
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
            <button type="submit" className="verificationBtn">
              Send reset-password email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
