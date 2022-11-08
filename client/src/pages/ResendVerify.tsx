// import React from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
// import { resendVerify } from "../services/userServices";
// import { VerifyUser } from "../types/types";

// export const ResendVerify = () => {
//   const navigate = useNavigate();
//   const formik = useFormik({
//     initialValues: {
//       email: "",
//     },
//     validationSchema: Yup.object({
//       email: Yup.string().email("Invalid email address").required("Required"),
//     }),
//     onSubmit: async (values: VerifyUser, { resetForm }) => {
//       try {
//         const res = await resendVerify(values);
//         toast.success(res.message);

//         resetForm({});
//         navigate("/login");
//       } catch (error: any) {
//         toast.error(error.response.data.message);
//       }
//     },
//   });

//   return (
//     <div className="register">
//       <ToastContainer />
//       <h1>Resend Verification Email:</h1>
//       <div className="card">
//         <form onSubmit={formik.handleSubmit}>
//           <div className="form__section">
//             <label htmlFor="email">Email:</label>
//             <input type="email" id="email" {...formik.getFieldProps("email")} />
//             {formik.touched.email && formik.errors.email ? (
//               <div>{formik.errors.email}</div>
//             ) : null}
//           </div>
//           <div className="form__section">
//             <button type="submit">Send Email</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

export {};
