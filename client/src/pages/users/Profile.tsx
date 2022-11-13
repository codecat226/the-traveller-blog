import React, { useEffect, useCallback } from "react";
import axios from "axios";
// import { UserProfile } from "../types/types";
import { refreshUser } from "../../services/userServices";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchUser, setUser } from "../../features/userSlice";
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

  return (
    <main className="profile">
      <section className="profile__section">
        {loading && <p>Loading...</p>}
        {error && <p>Error</p>}
        <h1>User Profile</h1>
        <p>Name: &nbsp;{user?.name}</p>
        <p>Email: &nbsp;{user?.email}</p>
        <p>Phone: &nbsp;{user?.phone}</p>
      </section>
    </main>
  );
};
