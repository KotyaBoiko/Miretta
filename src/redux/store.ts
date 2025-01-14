import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../features/user/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { authSlice } from "@/features/auth/slices/authSlice";

export const store = configureStore({
  reducer: { user: userSlice.reducer, auth: authSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
