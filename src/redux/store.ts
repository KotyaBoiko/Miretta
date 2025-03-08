import { authSlice } from "@/features/auth/redux/slices/authSlice";
import { cartSlice } from "@/features/cart/slices/cartSlice";
import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../features/user/slices/userSlice";
import { baseApi } from "./baseApi";
import { productSlice } from "@/features/products/slices/productSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
    product: productSlice.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
