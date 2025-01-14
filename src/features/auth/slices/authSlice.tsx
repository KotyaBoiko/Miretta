import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface IAuth {
  isAuth: boolean,
  email: string,
  id: string,
}

const initialState = {
  isAuth: false,
  email: "",
  id: "",
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  }
})

export const {setAuth} = authSlice.actions;

export default authSlice.reducer;