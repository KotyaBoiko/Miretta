import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cartApi } from "../API/cartApi";
import { ICartProduct } from "../types/cartTypes";

type initialStateType = {
  totalQuantity: number;
}

const initialState: initialStateType = {
  totalQuantity: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(cartApi.endpoints.getCart.matchFulfilled, (state, action: PayloadAction<ICartProduct[]>) => {
      state.totalQuantity = action.payload.length
    })
  }
})

export default cartSlice.reducer;


