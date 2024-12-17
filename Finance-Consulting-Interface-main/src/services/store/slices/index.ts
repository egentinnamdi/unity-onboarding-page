import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { authReducer } from "./authSlice.ts";
import { userReducer } from "./userSlice.ts";

export const rootReducer = combineReducers({
  auth: persistReducer(
    { key: "auth", storage, blacklist: ["logginIn", "logginOut", "loginRejectedError"] },
    authReducer,
  ),
  user: persistReducer(
    {
      key: "user",
      storage,
      blacklist: ["isFetchingData", "allUsers"],
    },
    userReducer,
  ),
});
