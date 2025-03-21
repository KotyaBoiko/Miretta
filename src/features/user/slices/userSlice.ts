import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../types";
import { userApi } from "../API/userApi";

const initUser: IUser | "null" = JSON.parse(
  localStorage.getItem("user") ||
    'null'
);

const initialState: IUser =
  initUser !== "null" && initUser
    ? initUser
    : {
        name: "",
        surname: "",
        email: "",
        birth: "",
        phone: "",
        id: "",
        addresses: undefined,
      };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.getUser.matchFulfilled,
      (state, action: PayloadAction<IUser>) => {
        localStorage.setItem("user", JSON.stringify(action.payload));
        return { ...action.payload };
      }
    );
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
