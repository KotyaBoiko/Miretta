import { cartApi } from "@/features/cart/API/cartApi";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IUserState  {
  id: string;
  email: string;
  name: string;
  surname: string;
}

const initialState: IUserState = {
    id: "",
    email: "",
    name: "",
    surname: "",
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserState>) => {
      state = action.payload;
    }
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
