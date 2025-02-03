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
  email: string | null;
}