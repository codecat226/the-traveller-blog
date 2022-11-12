import React, { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setUser } from "../../features/userSlice";
import { refreshUser } from "../../services/userServices";
import axios from "axios";
axios.defaults.withCredentials = true;

export const Contact = () => {
  const dispatch = useAppDispatch();
  //get login state
  const { isLoggedIn } = useAppSelector((state) => state.userR);
  //if the user is logged in --> call refresh token from this route too

  //use useCallback so that only rerenders on dispatch
  const handleRefresh = useCallback(async () => {
    try {
      const res = await refreshUser();
      dispatch(setUser(res.foundUser));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      const interval = setInterval(() => {
        handleRefresh();
      }, 1000 * 20);
      return () => clearInterval(interval);
    }
  }, [dispatch, handleRefresh, isLoggedIn]);

  return <div className="contactPage">Contact</div>;
};
