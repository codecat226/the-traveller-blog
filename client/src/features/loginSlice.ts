import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialStateLoggedIn } from "../types/types";

const initialState: InitialStateLoggedIn = {
  isLoggedIn: false,
};

const loginSlice = createSlice({
  name: "isLogin",
  initialState: initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setLoggedIn } = loginSlice.actions;
export default loginSlice.reducer;
