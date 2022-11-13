import axios from "axios";
import { UserLogin } from "../types/types";

const baseUrl = "https://the-traveller-blog.herokuapp.com/api/admin/";

export const loginAdmin = async (values: UserLogin) => {
  const res = await axios.post(`${baseUrl}login`, values);
  return res.data;
};
