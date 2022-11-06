import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import Modal from "../components/Modal";
import { resetPassword } from "../services/userServices";
import { ResetUser } from "../types/types";

export const ResetPassword = () => {
  let { token } = useParams();
  const navigate = useNavigate();
  const [modal, setModal] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values: ResetUser, { resetForm }) => {
      try {
        console.log(token);
        const res = await resetPassword(values, token);
        // set the token into the store so it can be used in the rest of the project
        setModal(res.message);
        setModalOpen(true);
        resetForm({});
        navigate("/login");
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
          {modalOpen && <Modal message={modal} closeModal={closeModal} />}
        </form>
      </div>
    </div>
  );
};
