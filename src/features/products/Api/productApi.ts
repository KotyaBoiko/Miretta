import { auth, db } from "@/firebase/firebase-config";
import { getFirestoreDataWithId } from "@/firebase/utils/getFirestoreDataWithId";
import { getFirestoreDocDataWithId } from "@/firebase/utils/getFirestoreDocDataWithId";
import { baseApi } from "@/redux/baseApi";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { IProduct } from "../types/product";
import { IWishlistProduct } from "../types/wishlistProduct";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProductsByCategory: builder.query<IProduct[], string>({
      async queryFn(category) {
        try {
          const q = query(
            collection(db, "products"),
            where("type", "==", category)
          );
          const response = await getDocs(q);
          const data = getFirestoreDataWithId<IProduct>(response);
          return { data };
        } catch (error) {
          return { error };
        }
      },
    }),
    getProduct: builder.query<IProduct, string>({
      async queryFn(id) {
        try {
          const docRef = doc(db, "products", id);
          const response = await getDoc(docRef);
          const data = getFirestoreDocDataWithId<IProduct>(response);
          return { data };
        } catch (error) {
          return { error };
        }
      },
    }),
    getProductsByCollection: builder.query<IProduct[], string>({
      async queryFn(id) {
        try {
          const q = query(
            collection(db, "products"),
            where("collections", "array-contains", id)
          );
          const response = await getDocs(q);
          const data = getFirestoreDataWithId<IProduct>(response);
          return { data };
        } catch (error) {
          return { error };
        }
      },
    }),
    getWishlist: builder.query<IWishlistProduct[], void>({
      async queryFn() {
        try {
          const wishlistRef = collection(
            db,
            "users",
            auth.currentUser!.uid,
            "wishlist"
          );
          const data = await getDocs(wishlistRef);
          const result = getFirestoreDataWithId<IWishlistProduct>(data);
          return { data: result };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["Wishlist"],
    }),
    addProductToWishlist: builder.mutation<string, IWishlistProduct>({
      async queryFn(wishlistProduct) {
        try {
          await setDoc(
            doc(
              collection(db, "users", auth.currentUser!.uid, "wishlist"),
              wishlistProduct.id
            ),
            wishlistProduct
          );
          return { data: wishlistProduct.id };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["Wishlist"],
    }),
    removeProductFromWishlist: builder.mutation<string, string>({
      async queryFn(id) {
        try {
          await deleteDoc(
            doc(collection(db, "users", auth.currentUser!.uid, "wishlist"), id)
          );
          return { data: id };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["Wishlist"],
    }),
  }),
});

export const {
  useGetProductsByCategoryQuery,
  useGetProductQuery,
  useGetProductsByCollectionQuery,
  useGetWishlistQuery,
  useAddProductToWishlistMutation,
  useRemoveProductFromWishlistMutation,
} = productApi;
