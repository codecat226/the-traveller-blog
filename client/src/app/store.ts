import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import { listenerMiddleware } from "../middlewares/middleware";

const userState = JSON.parse(localStorage.getItem("loggedIn") || "null");

export const store = configureStore({
  preloadedState: {
    userR: userState === null ? { value: false } : userState,
  },
  reducer: {
    userR: userReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    listenerMiddleware.middleware,
  ],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
