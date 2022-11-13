import React, { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setUser } from "../../features/userSlice";
import { refreshUser } from "../../services/userServices";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
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

  return (
    <main className="form form__contact">
      <h1>Get in touch!</h1>
      <div>
        <div className="div__contact">
          <AiOutlineMail />
          <a href="mailto:rika10012@gmail.com">Send an Email</a>
        </div>
        <div className="div__contact">
          <FaLinkedin />
          <a
            href="https://www.linkedin.com/in/rika-n/"
            target="_blank"
            rel="noreferrer"
          >
            Find me on LinkedIn
          </a>
        </div>
        <div className="div__contact">
          <FaGithub />
          <a
            href="https://github.com/codecat226/the-traveller"
            target="_blank"
            rel="noreferrer"
          >
            Find this project on GitHub
          </a>
        </div>
      </div>
    </main>
  );
};
