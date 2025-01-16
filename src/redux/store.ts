import { authSlice } from "@/features/auth/slices/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../features/user/slices/userSlice";

export const store = configureStore({
  reducer: { user: userSlice.reducer, auth: authSlice.reducer },
});


