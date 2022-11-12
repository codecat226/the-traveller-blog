import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { verifyUser } from "../../services/userServices";

export const Activate = () => {
  let { token } = useParams();
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const res = await verifyUser(token);
      toast.success(res.message);
      navigate("/login");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="form">
      <ToastContainer />
      <h1>Activate Account:</h1>
      <div className="card">
        <div className="form__section">
          <button
            onClick={() => {
              handleClick();
            }}
          >
            Yes, I want to activate my account
          </button>
        </div>
      </div>
    </div>
  );
};
