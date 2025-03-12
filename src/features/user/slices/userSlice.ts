import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../types";
import { userApi } from "../API/userApi";


const initUser:IUser | '' = JSON.parse(localStorage.getItem('user') || '')

const initialState: IUser = initUser ? initUser : {
  name: "",
  surname: "",
  email: "",
  birth: "",
  phone: "",
  id: "",
  addresses: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(userApi.endpoints.getUser.matchFulfilled, (state, action: PayloadAction<IUser>) => {
      localStorage.setItem('user', JSON.stringify(action.payload))
      return {...action.payload}
    });
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
