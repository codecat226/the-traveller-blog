import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import blogReducer from "../features/blogSlice";
import { listenerMiddleware } from "../middlewares/middleware";

const userState = JSON.parse(localStorage.getItem("loggedIn") || "null");

export const store = configureStore({
  preloadedState: {
    userR: userState === null ? { value: false } : userState,
  },
  reducer: {
    userR: userReducer,
    blogR: blogReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
