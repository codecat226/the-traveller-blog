import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { resendVerify } from "../services/userServices";
import { verifyUser } from "../types/types";
import Modal from "../components/Modal";

export const ResendVerify = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: async (values: verifyUser, { resetForm }) => {
      try {
        const res = await resendVerify(values);
        setModal(res.message);
        setModalOpen(true);
        resetForm({});
        navigate("/login");
      } catch (error: any) {
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
      <h1>Resend Verification Email:</h1>
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
            <button type="submit">Send Email</button>
          </div>
          <button
            onClick={() => {
              navigate("/login");
            }}
          >
            Back to login page
          </button>
          <br />
          {modalOpen && <Modal message={modal} closeModal={closeModal} />}
        </form>
      </div>
    </div>
  );
};
