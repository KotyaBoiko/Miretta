import { createAppAsyncThunk } from "@/redux/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { UserCredential } from "firebase/auth";
import { authService } from "../services";

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
  async (params: IAuthWithEmailAndPassword) => {
    switch (params.type) {
      case "signUp":
        return await authService.signUpWithEmailPassword(
          params.email,
          params.password
        );
      case "signIn":
        return await authService.signInWithEmailPassword(
          params.email,
          params.password
        );
      default:
        break;
    }
  }
);

export const authWithProvider = createAppAsyncThunk(
  "auth/authWithProvider",
  async (params: IAuthWithProvider) => {
    switch (params.type) {
      case "google":
        return await authService.signInWithGoogle();
      default:
        break;
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
      (action) => action.type.endsWith("rejected"),
      (state) => {
        state.loading = "failed";
      }
    );
    builder.addMatcher(
      (action): action is PayloadAction<UserCredential> =>
        action.type === "authWithEmailPassword/fulfilled" ||
        action.type === "authWithProvider/fulfilled",
      (state, action) => {
        state.loading = "succeeded";
        const userData = {
          email: action.payload.user.email,
          id: action.payload.user.uid,
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