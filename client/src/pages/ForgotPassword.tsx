import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { forgotPassword } from "../services/userServices";
import { ForgotUser } from "../types/types";
import Modal from "../components/Modal";

export const ForgotPassword = () => {
  const [modal, setModal] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
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
        setModal(res.message);
        setModalOpen(true);
        resetForm({});
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
            <button type="submit">Send reset-password email</button>
          </div>
          {modalOpen && <Modal message={modal} closeModal={closeModal} />}
        </form>
      </div>
    </div>
  );
};
