import { FC, useState } from "react";
import { auth, googleProvider } from "@/firebase/firebase-config";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
type Props = {};

console.log(auth.currentUser)

const SignUpForm: FC<Props> = ({}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUpWithEmailAndPAssword =  async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      console.log(userCredential)
      const user = auth.currentUser;
      console.log(user)
      setEmail("")
      setPassword("")
    } catch (error) {
      console.log(error)
    }
  }

  const signUpWithGoogle =  async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider)
      console.log(userCredential)
      const user = auth.currentUser;
      console.log(user)
    } catch (error) {
      console.log(error)
    }
  }
  const signOutUser =  async () => {
    try {
      const result = await signOut(auth)
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="wrapper">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signUpWithEmailAndPAssword}>Sign Up</button>
      <button onClick={signUpWithGoogle}>Sign Up with Google</button>
      <button onClick={signOutUser}>Sign Out</button>
    </div>
  );
};

export default SignUpForm;
