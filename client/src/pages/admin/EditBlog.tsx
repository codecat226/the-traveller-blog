import { useFormik } from "formik";
// import { parse, isDate } from "date-fns";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NewBlog } from "../../types/types";
import { useLocation, useNavigate } from "react-router-dom";
import { editBlog } from "../../services/blogServices";
import { useCallback, useEffect } from "react";
import { refreshUser } from "../../services/userServices";
import { setUser } from "../../features/userSlice";
import { useAppDispatch } from "../../app/hooks";

export const EditBlog = () => {
  const { state } = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { blog } = state;
  const { id, title, author, publishDate, body } = blog;

  const handleRefresh = useCallback(async () => {
    try {
      const res = await refreshUser();
      dispatch(setUser(res.data));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleRefresh();
    }, 1000 * 10);
    return () => clearInterval(interval);
  }, [dispatch, handleRefresh]);

  const initialState = {
    title: title,
    author: author,
    publishDate: publishDate,
    body: body,
  };

  // const parseDateString(value:Date, originalValue:undefined) => {
  //   const parsedDate = isDate(originalValue)
  //     ? originalValue
  //     : parse(originalValue, "yyyy-MM-dd", new Date());

  //   return parsedDate;
  // }
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialState,
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      author: Yup.string().required("Required"),
      publishDate: Yup.string().required("Required"),
      body: Yup.string()
        .min(20, "Body must be at least 20 characters")
        .required("Required"),
    }),
    onSubmit: async (values: NewBlog) => {
      try {
        const res = await editBlog(values, id);
        if (res.status === 201) {
          toast.success(res.data.message);
        }
      } catch (error: any) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    },
  });

  return (
    <div className="editContainer">
      <ToastContainer />
      <h1>Edit this blog:</h1>
      <div className="editContainer__centre">
        <form onSubmit={formik.handleSubmit} className="editContainer__form">
          <div className="form__section">
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" {...formik.getFieldProps("title")} />
            {formik.touched.title && formik.errors.title ? (
              <div>{formik.errors.title}</div>
            ) : null}
          </div>
          <div className="form__section">
            <label htmlFor="author">Author:</label>
            <input
              type="author"
              id="author"
              {...formik.getFieldProps("author")}
            />
            {formik.touched.author && formik.errors.author ? (
              <div>{formik.errors.author}</div>
            ) : null}
          </div>
          <div className="form__section">
            <label htmlFor="publishDate">Publish Date:</label>
            <input
              type="publishDate"
              id="publishDate"
              {...formik.getFieldProps("publishDate")}
            />
            {formik.touched.publishDate && formik.errors.publishDate ? (
              <div>{formik.errors.publishDate}</div>
            ) : null}
          </div>
          <div className="form__section">
            <label htmlFor="body">Body:</label>
            <textarea
              className="editForm__text"
              id="body"
              {...formik.getFieldProps("body")}
            />
            {formik.touched.body && formik.errors.body ? (
              <div>{formik.errors.body}</div>
            ) : null}
          </div>
          <div className="form__section">
            <button className="verificationBtn" type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
      <button
        className="secondaryBtn"
        onClick={() => {
          navigate("/dashboard");
        }}
      >
        Go back to dashboard
      </button>
    </div>
  );
};
