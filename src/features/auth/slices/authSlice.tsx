import { createAppAsyncThunk } from "@/redux/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authService } from "../services";
import { act } from "react";

export interface IAuthWithEmailAndPassword {
  type: "signIn" | "signUp";
  email: string;
  password: string;
}
export interface IAuthWithProvider {
  type: "google";
}

export interface IAuthData {
  id: string;
  email: string;
}

export interface IAuthState extends IAuthData {
  isAuth: boolean;
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: IAuthState = {
  email: "",
  id: "",
  isAuth: false,
  loading: "idle",
};

export const authWithEmailPassword = createAppAsyncThunk(
  "auth/authWithEmailPassword",
  async ({type, email, password}: IAuthWithEmailAndPassword) => {
    switch (type) {
      case "signUp":
        const signInUser = await authService.signUpWithEmailPassword(
          email,
          password
        );
        if (signInUser instanceof Error) return signInUser
        return {email: signInUser.user.email, id: signInUser.user.uid}
      case "signIn":
        const signUpUser = await authService.signInWithEmailPassword(
          email,
          password
        );
        if (signUpUser instanceof Error) return signUpUser
        return {email: signUpUser.user.email, id: signUpUser.user.uid}
      default:
        return Error('Incorrect method')
    }
  }
);

export const authWithProvider = createAppAsyncThunk(
  "auth/authWithProvider",
  async (params: IAuthWithProvider) => {
    switch (params.type) {
      case "google":
        const authWithGoogle = await authService.signInWithGoogle();
        if (authWithGoogle instanceof Error) return Error;
        return {email: authWithGoogle.user.email, id: authWithGoogle.user.uid}
      default:
        return Error('Incorrect provider')
    }
  }
);

export const logOut = createAppAsyncThunk("auth/logOut", async () => {
  const data = await authService.signOutUser();
  return data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logOut.fulfilled, (state) => {
      state.loading = "succeeded";
      localStorage.removeItem("authData");
    });
    builder.addMatcher(
      (action) => action.type.endsWith("pending"),
      (state) => {
        state.loading = "pending";
      }
    );
    builder.addMatcher(
      (action): action is PayloadAction<Error> => action.type.endsWith("rejected"),
      (state, action) => {
        state.loading = "failed";
        alert(action.payload.message)
      }
    );
    builder.addMatcher(
      (action): action is PayloadAction<IAuthData> =>
        action.type === "auth/authWithEmailPassword/fulfilled" ||
        action.type === "auth/authWithProvider/fulfilled",
      (state, action) => {
        state.loading = "succeeded";
        state.email = action.payload.email
        state.id = action.payload.id
        const userData = {
          email: action.payload.email,
          id: action.payload.id,
        };
        localStorage.setItem(
          "authData",
          JSON.stringify({ ...userData, isAuth: true })
        );
      }
    );
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;