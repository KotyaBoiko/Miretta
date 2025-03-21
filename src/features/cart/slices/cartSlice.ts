import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cartApi } from "../API/cartApi";
import { ICartProduct } from "../types/cartTypes";
import { logOut } from "@/features/auth/redux/thunks";

type initialStateType = {
  totalQuantity: number;
  productsInCart: string[];
  productsInCartNoAuthUser: ICartProduct[];
};

const totalQuantityLocal = localStorage.getItem("totalQuantity");
const productsInCartLocal = localStorage.getItem("productsInCart");
const productsInCartNoAuthUser = JSON.parse(
  localStorage.getItem("productsInCartNoAuthUser") || "[]"
);
const initialState: initialStateType = {
  totalQuantity: Number(totalQuantityLocal) ? Number(totalQuantityLocal) : 0,
  productsInCart: productsInCartLocal ? productsInCartLocal.split(" ") : [],
  productsInCartNoAuthUser: productsInCartNoAuthUser,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartLocal(state, action: PayloadAction<ICartProduct>) {
      state.totalQuantity++;
      state.productsInCart.push(action.payload.variantId);
      state.productsInCartNoAuthUser.push(action.payload);
    },
    removeFromCartLocal(state, action: PayloadAction<string>) {
      state.totalQuantity--;
      state.productsInCart = state.productsInCart.filter(i => i !== action.payload);
      state.productsInCartNoAuthUser = state.productsInCartNoAuthUser.filter(
        (i) => i.variantId !== action.payload
      );
      console.log(state)
    },
    clearCartLocal(state) {
      state.totalQuantity = 0;
      state.productsInCart = [];
      state.productsInCartNoAuthUser = [];
    },
    updateCartItemVariantLocal(
      state,
      action: PayloadAction<{ oldVariantId: string; newVariant: ICartProduct }>
    ) {
      const without = state.productsInCartNoAuthUser.filter(
        (i) => i.id !== action.payload.oldVariantId
      );
      const newExist = without.findIndex(
        (i) => i.id === action.payload.newVariant.id
      );

      if (newExist === -1) {
        state.totalQuantity++;
        without.push(action.payload.newVariant);
        state.productsInCart.push(action.payload.newVariant.variantId);
      } else {
        without[newExist].quantity += action.payload.newVariant.quantity;
      }
      state.productsInCartNoAuthUser = without;
    },
    updateCartItemQuantityLocal(
      state,
      action: PayloadAction<{ quantity: number, variantId: string; }>
    ) {
      const index = state.productsInCartNoAuthUser.findIndex(
        (i) => i.id === action.payload.variantId
      );
      if (index !== -1) {
        state.productsInCartNoAuthUser[index].quantity =
          action.payload.quantity;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logOut.fulfilled, (state) => {
      state.totalQuantity = 0;
      state.productsInCart = [];
    });
    builder.addMatcher(
      cartApi.endpoints.getCart.matchFulfilled,
      (state, action: PayloadAction<ICartProduct[]>) => {
        state.totalQuantity = action.payload.length;
        localStorage.setItem("totalQuantity", String(action.payload.length));
        const productsInCart = action.payload.map(
          (product) => product.variantId
        );
        state.productsInCart = productsInCart;
        localStorage.setItem("productsInCart", state.productsInCart.join(" "));
      }
    );
    builder.addMatcher(
      cartApi.endpoints.addProductToCart.matchFulfilled,
      (state, action: PayloadAction<string>) => {
        ++state.totalQuantity;
        localStorage.setItem("totalQuantity", String(state.totalQuantity));
        state.productsInCart.push(action.payload);
        localStorage.setItem("productsInCart", state.productsInCart.join(" "));
      }
    );
    builder.addMatcher(
      cartApi.endpoints.updateCartItemVariant.matchFulfilled,
      (
        state,
        action: PayloadAction<{ oldVariantId: string; newVariantId: string }>
      ) => {
        const without = state.productsInCart.filter(
          (i) => i !== action.payload.oldVariantId
        );
        const newExist = state.productsInCart.find(
          (i) => i === action.payload.newVariantId
        );
        if (newExist === undefined) {
          return;
        } else {
          without.push(newExist);
          state.productsInCart = without;
          localStorage.setItem(
            "productsInCart",
            state.productsInCart.join(" ")
          );
        }
      }
    );

    builder.addMatcher(
      cartApi.endpoints.removeProductFromCart.matchFulfilled,
      (state, action: PayloadAction<string>) => {
        --state.totalQuantity;
        localStorage.setItem("totalQuantity", String(state.totalQuantity));
        state.productsInCart.filter((i) => i !== action.payload);
        localStorage.setItem("productsInCart", state.productsInCart.join(" "));
      }
    );
    builder.addMatcher(cartApi.endpoints.clearCart.matchFulfilled, (state) => {
      state.totalQuantity = 0;
      localStorage.removeItem("totalQuantity");
      state.productsInCart = [];
      localStorage.removeItem("productsInCart");
    });
  },
});

export const {
  addToCartLocal,
  removeFromCartLocal,
  clearCartLocal,
  updateCartItemQuantityLocal,
  updateCartItemVariantLocal,
} = cartSlice.actions;

export default cartSlice.reducer;
