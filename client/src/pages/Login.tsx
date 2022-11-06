import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { setLoggedIn } from "../features/userSlice";
import { loginUser } from "../services/userServices";
import { UserLogin } from "../types/types";
import Modal from "../components/Modal";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values: UserLogin, { resetForm }) => {
      try {
        const res = await loginUser(values);
        // set the token into the store so it can be used in the rest of the project
        dispatch(setLoggedIn(true));
        setModal(res.message);
        setModalOpen(true);
        resetForm({});
        navigate("/profile");
      } catch (error: any) {
        console.log("error", error);
        setModal(error.response.data.message);
        setModalOpen(true);
      }
    },
  });

  const closeModal = () => {
    setModalOpen(false);
  };

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
          <button
            className="verificationBtn"
            onClick={() => {
              navigate("/forgot-password");
            }}
          >
            Forgot Password?
          </button>
          <button
            className="verificationBtn"
            onClick={() => {
              navigate("/resend-verify");
            }}
          >
            Resend verification email
          </button>
          {modalOpen && <Modal message={modal} closeModal={closeModal} />}
        </form>
      </div>
    </div>
  );
};
