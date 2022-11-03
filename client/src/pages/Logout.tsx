import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { setLoggedIn } from "../features/loginSlice";
axios.defaults.withCredentials = true;

export const Logout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let logoutErr = "";
  const sendReq = async () => {
    try {
      const res = await axios.post("http://localhost:3007/api/users/logout", {
        withCredentials: true,
      });
      console.log(res);
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
