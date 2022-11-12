import axios from "axios";
import { UserLogin } from "../types/types";

const baseUrl = "http://localhost:3007/api/admin/";

export const loginAdmin = async (values: UserLogin) => {
  const res = await axios.post(`${baseUrl}login`, values);
  return res.data;
};
