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
  reducers: {
    setTotalQuantity(state, action: PayloadAction<number>) {
      state.totalQuantity = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(cartApi.endpoints.getCart.matchFulfilled, (state, action: PayloadAction<ICartProduct[]>) => {
      state.totalQuantity = action.payload.length;
    })
    builder.addMatcher(cartApi.endpoints.addProductToCart.matchFulfilled, (state) => {
      state.totalQuantity++
    })
    builder.addMatcher(cartApi.endpoints.removeProductFromCart.matchFulfilled, (state) => {
      state.totalQuantity--
    })
    builder.addMatcher(cartApi.endpoints.clearCart.matchFulfilled, (state) => {
      state.totalQuantity = 0
    })
  }
})

export const {setTotalQuantity} = cartSlice.actions

export default cartSlice.reducer;


