import { createListenerMiddleware } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { setLoggedIn } from "../features/userSlice";

export const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  actionCreator: setLoggedIn,
  effect: (action, listenerApi) =>
    localStorage.setItem(
      "loggedIn",
      JSON.stringify((listenerApi.getState() as RootState).userR)
    ),
});
