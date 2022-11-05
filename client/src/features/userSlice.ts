import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialStateUser } from "../types/types";

const initialState: InitialStateUser = {
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setLoggedIn } = userSlice.actions;
export default userSlice.reducer;
