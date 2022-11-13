import React, { useCallback, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteBlog } from "../../services/blogServices";
import { refreshUser } from "../../services/userServices";
import { useAppDispatch } from "../../app/hooks";
import { setUser } from "../../features/userSlice";

export const DeleteBlog = () => {
  const { state } = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { blog } = state;
  const { id, title } = blog;

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

  const handleClick = async () => {
    try {
      const res = await deleteBlog(id);
      toast.success(res.message);
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="form">
      <ToastContainer />
      <h1>Delete "{title}"?</h1>
      <div className="card">
        <div className="form__section">
          <button
            className="deleteBtn"
            onClick={() => {
              handleClick();
            }}
          >
            Yes, delete this blog
          </button>
        </div>
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
