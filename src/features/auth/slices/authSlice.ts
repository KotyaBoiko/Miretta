import { createAppAsyncThunk } from "@/redux/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
  loadingLogOut: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: IAuthState = {
  email: "",
  id: "",
  isAuth: false,
  loading: "idle",
  loadingLogOut: "idle",
};

export const authWithEmailPassword = createAppAsyncThunk(
  "auth/authWithEmailPassword",
  async ({ type, email, password }: IAuthWithEmailAndPassword) => {
    let authUser;
    switch (type) {
      case "signUp":
        authUser = await authService.signUpWithEmailPassword(email, password);
        if (authUser instanceof Error) return authUser;
        break;
      case "signIn":
        authUser = await authService.signInWithEmailPassword(email, password);
        if (authUser instanceof Error) return authUser;
        break;
      default:
        return Error("Incorrect method");
    }

    return { email: authUser.user.email, id: authUser.user.uid };
  }
);

export const authWithProvider = createAppAsyncThunk(
  "auth/authWithProvider",
  async ({ type }: IAuthWithProvider) => {
    let authUser;
    switch (type) {
      case "google":
        authUser = await authService.signInWithGoogle();
        if (authUser instanceof Error) return Error;
        break;
      default:
        return Error("Incorrect provider");
    }
    return { email: authUser.user.email, id: authUser.user.uid };
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
    builder.addCase(logOut.pending, (state) => {
      state.loadingLogOut = "pending";
    });
    builder.addCase(logOut.fulfilled, (state) => {
      state.loadingLogOut = "succeeded";
      localStorage.removeItem("authData");
    });
    builder.addCase(logOut.rejected, (state) => {
      state.loadingLogOut = "failed";
    });
    builder.addMatcher(
      (action): action is PayloadAction<Error> =>
        action.type === "auth/authWithEmailPassword/rejected" ||
        action.type === "auth/authWithProvider/rejected",
      (state, action) => {
        state.loading = "failed";
        alert(action.payload.message);
      }
    );
    builder.addMatcher(
      (action): action is PayloadAction<Error> =>
        action.type === "auth/authWithEmailPassword/pending" ||
        action.type === "auth/authWithProvider/pending",
      (state) => {
        state.loading = "pending";
      }
    );
    builder.addMatcher(
      (action): action is PayloadAction<IAuthData> =>
        action.type === "auth/authWithEmailPassword/fulfilled" ||
        action.type === "auth/authWithProvider/fulfilled",
      (state, action) => {
        state.loading = "succeeded";
        state.email = action.payload.email;
        state.id = action.payload.id;
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
