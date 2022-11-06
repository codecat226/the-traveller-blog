import axios from "axios";
import { UserLogin, UserRegister, verifyUser } from "../types/types";

const baseUrl = "http://localhost:3007/api/users/";

export const registerUser = async (values: UserRegister) => {
  const res = await axios.post(`${baseUrl}register`, values);
  return res.data;
};

export const loginUser = async (values: UserLogin) => {
  const res = await axios.post(`${baseUrl}login`, values);
  return res.data;
};

export const userProfile = async () => {
  const res = await axios.get(`${baseUrl}profile`, {
    withCredentials: true,
  });
  return res.data;
};

export const logoutUser = async () => {
  const res = await axios.post(`${baseUrl}logout`, null, {
    withCredentials: true,
  });
  return res.data;
};

export const refreshToken = async () => {
  const res = await axios.get(`${baseUrl}refresh`, {
    withCredentials: true,
  });
  return res.data;
};

export const resendVerify = async (values: verifyUser) => {
  const res = await axios.post(`${baseUrl}resend-verify`, values);
  return res.data;
};
