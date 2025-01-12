import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface IUser {
  id?: string;
  email: string;
  name: string;
  surname: string;
}

interface userState {
  data: IUser;
  isAuth: boolean;
}

const initialState: userState = {
  data: {
    email: "",
    name: "",
    surname: "",
  },
  isAuth: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.data = action.payload;
    },
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
});

export const { setUser, setAuth } = userSlice.actions;

export default userSlice.reducer;
