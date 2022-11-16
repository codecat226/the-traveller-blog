import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserRegister } from "../../types/types";
import { registerUser } from "../../services/userServices";

export const Register = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Must be at least 8 characters")
        .required("Required"),
      phone: Yup.string().required("Required"),
    }),
    onSubmit: async (values: UserRegister, { resetForm }) => {
      try {
        const res = await registerUser(values);
        if (res.status === 200) {
          toast.success(res.data.message);
          resetForm({});
        }
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    },
  });
  return (
    <div className="form">
      <ToastContainer />
      <h1>Become a member:</h1>
      <div className="card">
        <form onSubmit={formik.handleSubmit}>
          <div className="form__section">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" {...formik.getFieldProps("name")} />
            {formik.touched.name && formik.errors.name ? (
              <div className="formikErrMsg">{formik.errors.name}</div>
            ) : null}
          </div>
          <div className="form__section">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" {...formik.getFieldProps("email")} />
            {formik.touched.email && formik.errors.email ? (
              <div className="formikErrMsg">{formik.errors.email}</div>
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
              <div className="formikErrMsg">{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="form__section">
            <label htmlFor="phone">Phone:</label>
            <input type="text" id="phone" {...formik.getFieldProps("phone")} />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="formikErrMsg">{formik.errors.phone}</div>
            ) : null}
          </div>
          <div className="form__section">
            <button className="verificationBtn" type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
