import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { setLoggedIn } from "../features/userSlice";
import { logoutUser } from "../services/userServices";
axios.defaults.withCredentials = true;

export const Logout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let logoutErr = "";
  const sendReq = async () => {
    try {
      await logoutUser();
      // set the login state to false:
      dispatch(setLoggedIn(false));
      //redirect to home
      navigate("/");
    } catch (error: any) {
      console.log(error);
      logoutErr = "Error logging out";
    }
  };

  useEffect(() => {
    sendReq();
  });
  return <p>{logoutErr}</p>;
};
