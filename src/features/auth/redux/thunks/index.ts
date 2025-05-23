import { createAppAsyncThunk } from "@/redux/types";
import type { UserCredential } from "firebase/auth";
import { authService } from "../../services";
import { addUser } from "../../services/authService";
import { IAuthWithEmailAndPassword, IAuthWithProvider } from "../../types";

export const authWithEmailPassword = createAppAsyncThunk(
  "auth/authWithEmailPassword",
  async ({ type, email, password }: IAuthWithEmailAndPassword) => {
    let authUser:Error | UserCredential;
    switch (type) {
      case "signUp":
        authUser = await authService.signUpWithEmailPassword(email, password);
        if (authUser instanceof Error) return authUser;
        await addUser({ email: authUser.user.email, id: authUser.user.uid })
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
        if (authUser.user.metadata.lastSignInTime === authUser.user.metadata.creationTime) { 
          await addUser({ email: authUser.user.email, id: authUser.user.uid });
        }

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