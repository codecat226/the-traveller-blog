import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialStateUser, UserProfile } from "../types/types";

const initialState: InitialStateUser = {
  isLoggedIn: false,
  user: { name: "", email: "", phone: "" },
};

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
    // setFirstRender: (state, action: PayloadAction<boolean>) => {
    //   state.firstRender = action.payload;
    // },
    setUser: (state, action: PayloadAction<UserProfile>) => {
      state.user = action.payload;
    },
  },
});

export const { setLoggedIn, setLoggedOut, setUser } = userSlice.actions;
export default userSlice.reducer;
