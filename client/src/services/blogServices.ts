import axios from "axios";
import { NewBlog } from "../types/types";

const baseUrl = "https://the-traveller-blog.herokuapp.com/api/blogs/";

export const editBlog = async (data: NewBlog, id: string) => {
  const res = await axios.post(`${baseUrl}${id}`, data);
  return res;
};

export const addBlog = async (data: NewBlog) => {
  const res = await axios.post(`${baseUrl}`, data);
  return res;
};

export const deleteBlog = async (id: string) => {
  const res = await axios.delete(`${baseUrl}${id}`);
  return res;
};
