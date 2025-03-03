import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cartApi } from "../API/cartApi";
import { ICartProduct } from "../types/cartTypes";

type initialStateType = {
  totalQuantity: number;
  productsInCart: string[];
}

const totalQuantityLocal = localStorage.getItem('totalQuantity')
const productsInCartLocal = localStorage.getItem('productsInCart')

const initialState: initialStateType = {
  totalQuantity: Number(totalQuantityLocal) ? Number(totalQuantityLocal) : 0,
  productsInCart: productsInCartLocal ? productsInCartLocal.split(" ") : []
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
      localStorage.setItem('totalQuantity', String(action.payload.length))
      const productsInCart = action.payload.map(product => product.variantId)
      state.productsInCart = productsInCart;
      localStorage.setItem('productsInCart', state.productsInCart.join(' '))
    })
    builder.addMatcher(cartApi.endpoints.addProductToCart.matchFulfilled, (state, action: PayloadAction<string>) => {
      ++state.totalQuantity;
      localStorage.setItem('totalQuantity', String(state.totalQuantity))
      state.productsInCart.push(action.payload)
      localStorage.setItem('productsInCart', state.productsInCart.join(' '))
    })
    builder.addMatcher(cartApi.endpoints.updateCartItemVariant.matchFulfilled, (state, action: PayloadAction<{oldVariantId: string, newVariantId: string}>) => {
      const without = state.productsInCart.filter(i => i !== action.payload.oldVariantId)
      const newExist = state.productsInCart.find(i => i === action.payload.newVariantId)
      if(newExist === undefined) {
        return
      } else {
        without.push(newExist);
        state.productsInCart = without;
        localStorage.setItem('productsInCart', state.productsInCart.join(' '))
      }
    })

    builder.addMatcher(cartApi.endpoints.removeProductFromCart.matchFulfilled, (state, action: PayloadAction<string>) => {
      --state.totalQuantity;
      localStorage.setItem('totalQuantity', String(state.totalQuantity))
      state.productsInCart.filter((i) => i !== action.payload)
      localStorage.setItem('productsInCart', state.productsInCart.join(' '))

    })
    builder.addMatcher(cartApi.endpoints.clearCart.matchFulfilled, (state) => {
      state.totalQuantity = 0;
      localStorage.removeItem('totalQuantity');
      state.productsInCart = [];
      localStorage.removeItem('productsInCart');
    })
  }
})

export const {setTotalQuantity} = cartSlice.actions

export default cartSlice.reducer;


