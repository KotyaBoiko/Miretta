import { FC, useState } from "react";
import { authService } from "../../services";

type Props = {};

const SignUpForm: FC<Props> = ({}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="wrapper">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={() => authService.signUpWithEmailPassword(email, password)}
      >
        Sign Up
      </button>
      <button onClick={authService.signInWithGoogle}>
        Sign Up with Google
      </button>
    </div>
  );
};

export default SignUpForm;
