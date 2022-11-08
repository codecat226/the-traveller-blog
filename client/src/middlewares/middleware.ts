import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { setLoggedIn, setLoggedOut } from "../features/userSlice";

export const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  matcher: isAnyOf(setLoggedIn, setLoggedOut),
  effect: (action, listenerApi) =>
    localStorage.setItem(
      "isLoggedIn",
      JSON.stringify((listenerApi.getState() as RootState).userR.isLoggedIn)
    ),
});

// export const listenerMiddleware = createListenerMiddleware();
// listenerMiddleware.startListening({
//   matcher: isAnyOf(increment, decrement),
//   effect: (action, listenerApi) =>
//     localStorage.setItem(
//       "count",
//       JSON.stringify((listenerApi.getState() as RootState).counter)
//     ),
// });
