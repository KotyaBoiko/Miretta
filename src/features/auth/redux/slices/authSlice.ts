import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthData } from "../../types";
import { logOut } from "../thunks";

export interface IAuthState extends IAuthData {
  isAuth: boolean;
  isAuthReady: boolean;
  loading: "idle" | "pending" | "succeeded" | "failed";
  loadingLogOut: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: IAuthState = {
  email: "",
  id: "",
  isAuth: false,
  isAuthReady: false,
  loading: "idle",
  loadingLogOut: "idle",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setAuthReady: (state, action: PayloadAction<boolean>) => {
      state.isAuthReady = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(logOut.pending, (state) => {
      state.loadingLogOut = "pending";
    });
    builder.addCase(logOut.fulfilled, (state) => {
      state.loadingLogOut = "succeeded";
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
      }
    );
  },
});

export const { setAuth, setAuthReady } = authSlice.actions;

export default authSlice.reducer;
