import { auth, db } from "@/firebase/firebase-config";
import { clearCollection } from "@/firebase/utils/clearCollection";
import { getFirestoreDataWithId } from "@/firebase/utils/getFirestoreDataWithId";
import { baseApi } from "@/redux/baseApi";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  QuerySnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDocs } from "firebase/firestore/lite";
import { ICartProduct } from "../types/cartTypes";

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<ICartProduct[], void>({
      async queryFn() {
        try {
          if (!auth.currentUser) throw new Error("User not authenticated");
          const cartRef = collection(db, "users", auth.currentUser.uid, "cart");
          const response = await getDocs(cartRef);
          const data = getFirestoreDataWithId<ICartProduct>(
            response as QuerySnapshot<DocumentData, DocumentData>
          );
          return { data };
        } catch (error) {
          return { error };
        }
      },
    }),
    addProductToCart: builder.mutation<null, ICartProduct>({
      async queryFn(cartProduct) {
        try {
          if (!auth.currentUser) throw new Error("User not authenticated");
          const productRef = doc(
            collection(db, "users", auth.currentUser.uid, "cart"),
            cartProduct.variantId
          );
          await setDoc(productRef, cartProduct);
          return { data: null };
        } catch (error) {
          return { error };
        }
      },
    }),
    updateCartItemVariant: builder.mutation<
      null,
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
          return { data: null };
        } catch (error) {
          return { error };
        }
      },
    }),
    updateProductQuantity: builder.mutation<
      null,
      { quantity: number; variantId: string }
    >({
      async queryFn({ quantity, variantId }) {
        try {
          if (!auth.currentUser) throw new Error("User not authenticated");
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
    }),
    removeProductFromCart: builder.mutation<null, string>({
      async queryFn(id) {
        try {
          if (!auth.currentUser) throw new Error("User not authenticated");
          const productRef = doc(
            collection(db, "users", auth.currentUser.uid, "cart"),
            id
          );
          await deleteDoc(productRef);
          return { data: null };
        } catch (error) {
          return { error };
        }
      },
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
