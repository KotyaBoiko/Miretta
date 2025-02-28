import { createSlice } from "@reduxjs/toolkit";
import { ICartProduct } from "../types/cartTypes";

type initialState = {
  items: ICartProduct[];
  totalQuantity: number;
  totalPrice: number;
}

const initialState: initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart (state, action: { payload: ICartProduct }) {
      state.totalQuantity++;
      state.totalPrice += action.payload.price;
      state.items.push(action.payload);
    },
    removeFromCart (state, action: { payload: string }) {
      const item = state.items.find(item => item.variantId === action.payload);
      state.totalQuantity -= item!.quantity;
      state.totalPrice -= item!.price * item!.quantity;
      state.items = state.items.filter(item => item.variantId !== action.payload);
    },
    updateQuantity (state, action: { payload: { variantId: string, quantity: number } }) {
      const item = state.items.find(item => item.variantId === action.payload.variantId);
      state.totalQuantity += action.payload.quantity - item!.quantity;
      const newPrice = item!.price * action.payload.quantity;
      const oldPrice = item!.price * item!.quantity;
      state.totalPrice += newPrice - oldPrice;
      item!.quantity = action.payload.quantity;
    },
    updateVariant (state, action: { payload: { newCartProduct: ICartProduct, oldVariant: string } }) {
      const oldItem = state.items.find(item => item.variantId === action.payload.oldVariant);
      const newItem = action.payload.newCartProduct;
      const stateItemsWithoutOld = state.items.filter(item => item.variantId !== action.payload.oldVariant);
      const existingItemInState = stateItemsWithoutOld.findIndex(item => item.variantId === newItem.variantId)
      if (existingItemInState !== -1) {
        state.items[existingItemInState].quantity += oldItem!.quantity;
      } else {
        state.items.push(newItem);
      }
    }
  }
})