import { logOut } from "@/features/auth/redux/thunks";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { productApi } from "../Api/productApi";
import { IWishlistProduct } from "../types/wishlistProduct";

type TInitialState = {
  likedProducts: string[];
};

const localWishlist = localStorage.getItem("wishlist");

const initialState: TInitialState = {
  likedProducts: localWishlist ? localWishlist.split(" ") : [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logOut.fulfilled, (state) => {
      state.likedProducts = [];
    });
    builder.addMatcher(
      productApi.endpoints.getWishlist.matchFulfilled,
      (state, action: PayloadAction<IWishlistProduct[]>) => {
        state.likedProducts = action.payload.map((i) => i.id);
        localStorage.setItem("wishlist", state.likedProducts.join(" "));
      }
    );
    builder.addMatcher(
      productApi.endpoints.addProductToWishlist.matchFulfilled,
      (state, action: PayloadAction<string>) => {
        state.likedProducts.push(action.payload);
        localStorage.setItem("wishlist", state.likedProducts.join(" "));
      }
    );
    builder.addMatcher(
      productApi.endpoints.removeProductFromWishlist.matchFulfilled,
      (state, action: PayloadAction<string>) => {
        state.likedProducts = state.likedProducts.filter(
          (i) => i !== action.payload
        );
        localStorage.setItem("wishlist", state.likedProducts.join(" "));
      }
    );
  },
});

export const {} = productSlice.actions;
export default productSlice.reducer;
