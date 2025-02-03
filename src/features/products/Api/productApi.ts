import { auth, db } from "@/firebase/firebase-config";
import { baseApi } from "@/redux/baseApi";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { Product } from "../types/product";
import { getFirestoreDataWithId } from "@/firebase/utils/getFirestoreDataWithId";
import { getFirestoreDocDataWithId } from "@/firebase/utils/getFirestoreDocDataWithId";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProductsByCategory: builder.query<Product[], string>({
      async queryFn(category) {
        try {
          const q = query(
            collection(db, "products"),
            where("type", "==", category)
          );
          const response = await getDocs(q);
          const data = getFirestoreDataWithId<Product>(response);
          return { data };
        } catch (error) {
          return { error };
        }
      },
    }),
    getProduct: builder.query<Product, string>({
      async queryFn(id) {
        try {
          const docRef = doc(db, "products", id);
          const response = await getDoc(docRef);
          const data = getFirestoreDocDataWithId<Product>(response);
          return { data };
        } catch (error) {
          return { error };
        }
      },
    }),
    getProductsByCollection: builder.query<Product[], string>({
      async queryFn(id) {
        try {
          const q = query(
            collection(db, "products"),
            where("collections", "array-contains", id)
          );
          const response = await getDocs(q);
          const data = getFirestoreDataWithId<Product>(response);
          return { data };
        } catch (error) {
          return { error };
        }
      },
    }),
    toggleLikeProduct: builder.mutation<null, {isLiked: boolean, productId: string}>({
      async queryFn({isLiked, productId}) {

        try {
          const docRef = doc(db, 'users', auth.currentUser!.uid)
          if (isLiked) {
            await updateDoc(docRef, {
              likedProducts: arrayRemove(productId)
            })
          } else {
            await updateDoc(docRef, {
              likedProducts: arrayUnion(productId)
            })
          }
          return {data: null}
        } catch (error) {
          return {error}
        }
      }
    })
  }),
});

export const {
  useGetProductsByCategoryQuery,
  useGetProductQuery,
  useGetProductsByCollectionQuery,
  useToggleLikeProductMutation,
} = productApi;
