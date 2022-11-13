import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Blog, InitialStateBlog } from "../types/types";

const initialState: InitialStateBlog = {
  error: "",
  loading: true,
  blogs: [],
};

export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async (searchQuery: string) => {
    const response = await axios.get(
      `http://localhost:3007/api/blogs?search=${searchQuery}`,
      {
        withCredentials: true,
      }
    );
    return response.data.data;
  }
);

//use extraReducers to get the three promise states of fetching from API
const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action: PayloadAction<Blog[]>) => {
        state.loading = false;
        state.blogs = action.payload;
        state.error = "";
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.blogs = [];
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default blogSlice.reducer;
