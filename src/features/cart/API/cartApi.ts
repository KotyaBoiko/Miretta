import { auth, db } from "@/firebase/firebase-config";
import { clearCollection } from "@/firebase/utils/clearCollection";
import { getFirestoreDataWithId } from "@/firebase/utils/getFirestoreDataWithId";
import { baseApi } from "@/redux/API/baseApi";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { ICartProduct } from "../types/cartTypes";

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<ICartProduct[], void>({
      async queryFn() {
        try {
          if (!auth.currentUser) throw new Error("User not authenticated");
          const cartRef = collection(db, "users", auth.currentUser.uid, "cart");
          const response = await getDocs(cartRef);
          const data = getFirestoreDataWithId<ICartProduct>(response);
          return { data };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["Cart"],
    }),
    addProductToCart: builder.mutation<string, ICartProduct>({
      async queryFn(cartProduct) {
        try {
          if (!auth.currentUser) throw new Error("User not authenticated");
          const productRef = doc(
            collection(db, "users", auth.currentUser.uid, "cart"),
            cartProduct.variantId
          );
          await setDoc(productRef, cartProduct);
          return { data: cartProduct.variantId };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["Cart"],
    }),
    updateCartItemVariant: builder.mutation<
      {oldVariantId: string, newVariantId: string},
      { newCartProduct: ICartProduct; oldVariant: string }
    >({
      async queryFn({ newCartProduct, oldVariant }) {
        try {
          if (!auth.currentUser) throw new Error("User not authenticated");
          const productRef = doc(
            collection(db, "users", auth.currentUser.uid, "cart"),
            newCartProduct.variantId
          );
          await deleteDoc(
            doc(
              collection(db, "users", auth.currentUser.uid, "cart"),
              oldVariant
            )
          );
          await setDoc(productRef, newCartProduct);
          return { data: {oldVariantId: oldVariant, newVariantId: newCartProduct.variantId} };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["Cart"]
    }),
    updateProductQuantity: builder.mutation<
      null,
      { quantity: number; variantId: string }
    >({
      async queryFn({ quantity, variantId }) {
        try {
          if (!auth.currentUser) throw new Error("User not authenticated");
          if (Number.isNaN(quantity))
            throw new Error("Quantity is not a number");
          const productRef = doc(
            collection(db, "users", auth.currentUser.uid, "cart"),
            variantId
          );
          await updateDoc(productRef, { quantity });
          return { data: null };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["Cart"],
    }),
    clearCart: builder.mutation<null, void>({
      async queryFn() {
        try {
          await clearCollection(`users/${auth.currentUser!.uid}/cart`);
          return { data: null };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["Cart"]
    }),
    removeProductFromCart: builder.mutation<string, string>({
      async queryFn(id) {
        try {
          if (!auth.currentUser) throw new Error("User not authenticated");
          const productRef = doc(
            collection(db, "users", auth.currentUser.uid, "cart"),
            id
          );
          await deleteDoc(productRef);
          return { data: id };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddProductToCartMutation,
  useUpdateProductQuantityMutation,
  useUpdateCartItemVariantMutation,
  useRemoveProductFromCartMutation,
  useClearCartMutation,
} = cartApi;
