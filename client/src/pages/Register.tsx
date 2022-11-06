import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { UserRegister } from "../types/types";
import { registerUser } from "../services/userServices";
import Modal from "../components/Modal";

export const Register = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
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
      <h1>Register:</h1>
      <div className="card">
        <form onSubmit={formik.handleSubmit}>
          <div className="form__section">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" {...formik.getFieldProps("name")} />
            {formik.touched.name && formik.errors.name ? (
              <div>{formik.errors.name}</div>
            ) : null}
          </div>
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
            <label htmlFor="phone">Phone:</label>
            <input type="text" id="phone" {...formik.getFieldProps("phone")} />
            {formik.touched.phone && formik.errors.phone ? (
              <div>{formik.errors.phone}</div>
            ) : null}
          </div>
          <div className="form__section">
            <button type="submit">Register</button>
          </div>
          {modalOpen && <Modal message={modal} closeModal={closeModal} />}
        </form>
      </div>
    </div>
  );
};
