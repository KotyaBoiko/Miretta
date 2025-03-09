import { auth, db } from "@/firebase/firebase-config";
import { baseApi } from "@/redux/baseApi";
import {
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { IAddress, IUser } from "./types";
import { EmailAuthProvider } from "firebase/auth/web-extension";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<IUser, void>({
      async queryFn() {
        try {
          if (!auth.currentUser) throw Error("User not exist");
          const docRef = doc(db, "users", auth.currentUser.uid);
          const response = await getDoc(docRef);
          return { data: response.data() as IUser };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ['User']
    }),
    setUserEmail: builder.mutation<null, string>({
      async queryFn(email) {
        try {
          if (!auth.currentUser) throw Error("User not exist");
          await updateEmail(auth.currentUser, email).then(() => {});
          await updateDoc(doc(db, "users", auth.currentUser.uid), { email });
          return { data: null };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ['User']
    }),
    setUserPassword: builder.mutation<null, string>({
      async queryFn(password) {
        try {
          if (!auth.currentUser) throw Error("User not exist");
          await updatePassword(auth.currentUser, password);
          return { data: null };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ['User']
    }),
    setUserPersonalData: builder.mutation<
      null,
      Omit<IUser, "id" | "email" | 'addresses'>
    >({
      async queryFn(newUserData) {
        try {
          if (!auth.currentUser) throw Error("User not exist");
          const userRef = doc(db, "users", auth.currentUser.uid);
          await updateDoc(userRef, newUserData);
          return { data: null };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ['User']
    }),
    reAuthUser: builder.mutation<boolean, string>({
      async queryFn(password) {
        try {
          if (!auth.currentUser?.email) throw Error("User not exist");
          const credential = EmailAuthProvider.credential(
            auth.currentUser.email,
            password
          );
          await reauthenticateWithCredential(auth.currentUser, credential);
          return { data: true };
        } catch (error) {
          console.log("not success", error);
          return { error };
        }
      },
    }),
    editAddress: builder.mutation<null, IAddress[]>({
      async queryFn(addresses) {
        try {
          if (!auth.currentUser) throw Error("User not exist");
          const userRef = doc(db, 'users', auth.currentUser.uid)
          await updateDoc(userRef, {
            addresses: addresses,
          })
          return {data: null}
        } catch (error) {
          return {error}
        }
      },
      invalidatesTags: ['User']
    }),
  }),
});

export const {
  useGetUserQuery,
  useSetUserEmailMutation,
  useSetUserPasswordMutation,
  useSetUserPersonalDataMutation,
  useReAuthUserMutation,
  useEditAddressMutation
} = userApi;
