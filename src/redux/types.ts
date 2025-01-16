import { useDispatch, useSelector } from "react-redux";
import { store } from "./store";
import { createAsyncThunk } from "@reduxjs/toolkit";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state?: RootState;
  dispatch: AppDispatch;
}>();