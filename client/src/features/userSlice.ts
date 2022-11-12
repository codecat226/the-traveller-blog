import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { InitialStateUser, UserProfile } from "../types/types";

const initialState: InitialStateUser = {
  error: "",
  loading: true,
  isLoggedIn: false,
  isAdmin: false,
  user: { name: "", email: "", phone: "" },
};

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await axios.get("http://localhost:3007/api/users/profile", {
    withCredentials: true,
  });
  return response.data.data;
});

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setLoggedIn: (state) => {
      state.isLoggedIn = true;
    },
    setLoggedOut: (state) => {
      state.isLoggedIn = false;
    },
    setAdmin: (state) => {
      state.isAdmin = true;
    },
    removeAdmin: (state) => {
      state.isAdmin = false;
    },
    setUser: (state, action: PayloadAction<UserProfile>) => {
      state.user = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchUser.fulfilled,
        (state, action: PayloadAction<UserProfile>) => {
          state.loading = false;
          state.user = action.payload;
          state.error = "";
        }
      )
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.user = {} as UserProfile;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { setLoggedIn, setUser, setLoggedOut, setAdmin, removeAdmin } =
  userSlice.actions;
export default userSlice.reducer;
