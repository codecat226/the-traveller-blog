import axios from "axios";
import {
  ForgotUser,
  ResetUser,
  UserLogin,
  UserRegister,
  VerifyUser,
} from "../types/types";

const baseUrl = "https://the-traveller-blog.herokuapp.com/api/users/";

export const registerUser = async (values: UserRegister) => {
  const res = await axios.post(`${baseUrl}register`, values);
  return res.data;
};

export const verifyUser = async (token: string | undefined) => {
  const res = await axios.post(`${baseUrl}verify/${token}`);
  return res.data;
};

export const loginUser = async (values: UserLogin) => {
  const res = await axios.post(`${baseUrl}login`, values);
  return res;
};

export const loginAdmin = async (values: UserLogin) => {
  const res = await axios.post(`${baseUrl}login`, values);
  return res;
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
  return res;
};

export const refreshUser = async () => {
  const res = await axios.get(`${baseUrl}refresh`, {
    withCredentials: true,
  });
  return res.data;
};

export const resendVerify = async (values: VerifyUser) => {
  const res = await axios.post(`${baseUrl}resend-verify`, values);
  return res.data;
};

export const forgotPassword = async (values: ForgotUser) => {
  const res = await axios.post(`${baseUrl}forgot-password`, values);
  return res.data;
};

export const resetPassword = async (
  values: ResetUser,
  token: string | undefined
) => {
  const res = await axios.post(`${baseUrl}reset-password/${token}`, values);
  return res.data;
};
