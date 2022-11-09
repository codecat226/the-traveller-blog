import React, { useEffect, useCallback } from "react";
import axios from "axios";
// import { UserProfile } from "../types/types";
import { refreshToken } from "../services/userServices";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchUser, setUser } from "../features/userSlice";
axios.defaults.withCredentials = true;

export const Profile = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const { user, error, loading } = useAppSelector((state) => state.userR);

  //use useCallback so that only rerenders on dispatch
  const handleRefresh = useCallback(async () => {
    try {
      const res = await refreshToken();
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

  return (
    <main>
      {loading && <p>Loading...</p>}
      {error && <p>Error</p>}
      <h2>User Profile</h2>
      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
      <p>Phone: {user?.phone}</p>
    </main>
  );
};
