import { logOut } from "@/features/auth/redux/thunks";
import { auth } from "@/firebase/firebase-config";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cartApi } from "../API/cartApi";
import { ICartProduct } from "../types/cartTypes";

type initialStateType = {
  totalQuantity: number;
  productsInCart: [string, number][];
  productsInCartNoAuthUser: ICartProduct[];
};

const totalQuantityLocal = localStorage.getItem("totalQuantity");
const productsInCartLocal = JSON.parse(
  localStorage.getItem("productsInCart") || "[]"
);
const productsInCartNoAuthUser = !auth.currentUser
  ? JSON.parse(localStorage.getItem("productsInCartNoAuthUser") || "[]")
  : [];
const initialState: initialStateType = {
  totalQuantity: Number(totalQuantityLocal) ? Number(totalQuantityLocal) : 0,
  productsInCart: productsInCartLocal,
  productsInCartNoAuthUser: productsInCartNoAuthUser,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartLocal(state, action: PayloadAction<ICartProduct>) {
      state.totalQuantity++;
      state.productsInCart.push([action.payload.variantId, 1]);
      state.productsInCartNoAuthUser.push(action.payload);
    },
    removeFromCartLocal(state, action: PayloadAction<string>) {
      state.totalQuantity--;
      state.productsInCart = state.productsInCart.filter(
        (i) => i[0] !== action.payload
      );
      state.productsInCartNoAuthUser = state.productsInCartNoAuthUser.filter(
        (i) => i.variantId !== action.payload
      );
    },
    clearCartLocal(state) {
      state.totalQuantity = 0;
      state.productsInCart = [];
      state.productsInCartNoAuthUser = [];
    },
    updateCartItemVariantLocal(
      state,
      action: PayloadAction<{ oldVariantId: string; newVariant: ICartProduct}>
    ) {
      const without = state.productsInCartNoAuthUser.filter(
        (i) => i.variantId !== action.payload.oldVariantId
      );
      const newExist = without.findIndex(
        (i) => i.variantId === action.payload.newVariant.variantId
      );

      if (newExist === -1) {
        without.push(action.payload.newVariant);
        state.productsInCart.push([
          action.payload.newVariant.variantId,
          action.payload.newVariant.quantity,
        ]);
      } else {
        state.totalQuantity--;
        without[newExist].quantity += action.payload.newVariant.quantity;
      }
      state.productsInCartNoAuthUser = without;
      state.productsInCart = without.map(p => [
        p.variantId,
        p.quantity,
      ])
    },
    updateCartItemQuantityLocal(
      state,
      action: PayloadAction<{ quantity: number; variantId: string }>
    ) {
      const index = state.productsInCartNoAuthUser.findIndex(
        (i) => i.variantId === action.payload.variantId
      );
      if (index != -1) {
        state.productsInCartNoAuthUser[index].quantity =
          action.payload.quantity;
        state.productsInCart.map((i) => {
          if (i[0] == state.productsInCartNoAuthUser[index].variantId) {
            return [i[0], state.productsInCartNoAuthUser[index].quantity];
          } else {
            return i;
          }
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logOut.fulfilled, (state) => {
      const localData: ICartProduct[] = JSON.parse(
        localStorage.getItem("productsInCartNoAuthUser") || "[]"
      );
      state.totalQuantity = localData.length;
      state.productsInCart = localData.map((product) => [
        product.variantId,
        product.quantity,
      ]);
      localStorage.setItem("totalQuantity", String(state.totalQuantity));
      localStorage.setItem("productsInCart", state.productsInCart.join(" "));
    });
    builder.addMatcher(
      (action): action is PayloadAction<any> => action.type.startsWith("cart/"),
      (state) => {
        localStorage.setItem("totalQuantity", String(state.totalQuantity));
        localStorage.setItem(
          "productsInCart",
          JSON.stringify(state.productsInCart)
        );
        localStorage.setItem(
          "productsInCartNoAuthUser",
          JSON.stringify(state.productsInCartNoAuthUser)
        );
      }
    );
    builder.addMatcher(
      cartApi.endpoints.getCart.matchFulfilled,
      (state, action: PayloadAction<ICartProduct[]>) => {
        state.totalQuantity = action.payload.length;
        const productsInCart: [string, number][] = action.payload.map(
          (product) => {
            return [product.variantId, product.quantity];
          }
        );
        state.productsInCart = productsInCart;
        localStorage.setItem("totalQuantity", String(action.payload.length));
        localStorage.setItem(
          "productsInCart",
          JSON.stringify(state.productsInCart)
        );
      }
    );
    builder.addMatcher(
      cartApi.endpoints.addProductToCart.matchFulfilled,
      (state, action: PayloadAction<string>) => {
        ++state.totalQuantity;
        state.productsInCart.push([action.payload, 1]);
        localStorage.setItem("totalQuantity", String(state.totalQuantity));
        localStorage.setItem(
          "productsInCart",
          JSON.stringify(state.productsInCart)
        );
      }
    );
    builder.addMatcher(
      cartApi.endpoints.updateCartItemVariant.matchFulfilled,
      (
        state,
        action: PayloadAction<{
          oldVariantId: string;
          newCartProduct: ICartProduct;
        }>
      ) => {
        const without = state.productsInCart.filter(
          (i) => i[0] !== action.payload.oldVariantId
        );
        const newExist = without.findIndex(
          (i) => i[0] === action.payload.newCartProduct.variantId
        );
        if (newExist != -1) {
          without[newExist][1] = action.payload.newCartProduct.quantity;
        } else {
          without.push([
            action.payload.newCartProduct.variantId,
            action.payload.newCartProduct.quantity,
          ]);
          state.productsInCart = without;
          localStorage.setItem(
            "productsInCart",
            JSON.stringify(state.productsInCart)
          );
        }
      }
    );

    builder.addMatcher(
      cartApi.endpoints.removeProductFromCart.matchFulfilled,
      (state, action: PayloadAction<string>) => {
        --state.totalQuantity;
        state.productsInCart.filter((i) => i[0] !== action.payload);
        localStorage.setItem("totalQuantity", String(state.totalQuantity));
        localStorage.setItem("productsInCart", JSON.stringify(state.productsInCart));
      }
    );
    builder.addMatcher(cartApi.endpoints.clearCart.matchFulfilled, (state) => {
      state.totalQuantity = 0;
      state.productsInCart = [];
      localStorage.removeItem("totalQuantity");
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
