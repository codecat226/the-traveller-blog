import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import {
  removeAdmin,
  setAdmin,
  setLoggedIn,
  setLoggedOut,
} from "../features/userSlice";

export const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  matcher: isAnyOf(setLoggedIn, setLoggedOut),
  effect: (action, listenerApi) =>
    localStorage.setItem(
      "isLoggedIn",
      JSON.stringify((listenerApi.getState() as RootState).userR.isLoggedIn)
    ),
});

export const listenerMiddlewareTwo = createListenerMiddleware();
listenerMiddleware.startListening({
  matcher: isAnyOf(setAdmin, removeAdmin),
  effect: (action, listenerApi) =>
    localStorage.setItem(
      "isAdmin",
      JSON.stringify((listenerApi.getState() as RootState).userR.isAdmin)
    ),
});
