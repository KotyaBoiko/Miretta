import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { productApi } from "../Api/productApi";

type TInitialState = {
  likedProducts: string[];
};

const localLikedProducts = localStorage.getItem('likedProducts')

const initialState: TInitialState = {
  likedProducts: localLikedProducts ? localLikedProducts.split(" ") : [],
};


export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      productApi.endpoints.getLikedProducts.matchFulfilled,
      (state, action: PayloadAction<string[]>) => {
        state.likedProducts = action.payload;
        localStorage.setItem('likedProducts', state.likedProducts.join(' '))
      }
    );
    builder.addMatcher(productApi.endpoints.toggleLikeProduct.matchFulfilled, (state, action: PayloadAction<{isLiked: boolean, productId: string}>) => {
      if (action.payload.isLiked) {
        state.likedProducts = state.likedProducts.filter(i => i !== action.payload.productId)
      } else {
        state.likedProducts.push(action.payload.productId)
      }
      localStorage.setItem('likedProducts', state.likedProducts.join(' '))
    })
  },
});

export const {} = productSlice.actions;
export default productSlice.reducer;
