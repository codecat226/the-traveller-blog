import React, { useEffect, useCallback, useState } from "react";
import axios from "axios";
// import { UserProfile } from "../types/types";
import { refreshToken, userProfile } from "../services/userServices";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setUser } from "../features/userSlice";
axios.defaults.withCredentials = true;

export const Profile = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userR);
  const [firstRender, setFirstRender] = useState(true);

  const sendFirstReq = async () => {
    try {
      const res = await userProfile();
      dispatch(setUser(res.foundUser));
      setFirstRender(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (firstRender) {
    sendFirstReq();
  }

  //use useCallback so that only rerenders on dispatch
  const handleRefresh = useCallback(async () => {
    try {
      const res = await refreshToken();
      dispatch(setUser(res.foundUser));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!firstRender) {
      const interval = setInterval(() => {
        handleRefresh();
      }, 1000 * 10);
      return () => clearInterval(interval);
    }
  }, [dispatch, firstRender, handleRefresh]);

  return (
    <main>
      <h2>User Profile</h2>
      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
      <p>Phone: {user?.phone}</p>
    </main>
  );
};
