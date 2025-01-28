import { authSlice } from "@/features/auth/slices/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../features/user/slices/userSlice";
import { baseApi } from "./baseApi";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    auth: authSlice.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
