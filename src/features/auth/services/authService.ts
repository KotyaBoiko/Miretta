import { auth, googleProvider } from "@/firebase/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export const signUpWithEmailPassword = async (
  email: string,
  password: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential
  } catch (error) {
    if (error instanceof Error) {
      return error
    }
    return Error("Unknown error")
  }
};

export const signInWithGoogle = async () => {
  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    return userCredential
  } catch (error) {
    if (error instanceof Error) {
      return error
    }
    return Error("Unknown error")
  }
};

export const signInWithEmailPassword = async (
  email: string,
  password: string
) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential
  } catch (error) {
    if (error instanceof Error) {
      return error
    }
    return Error("Unknown error")
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    if (error instanceof Error) {
     alert(error.message)
    }
  }
};
