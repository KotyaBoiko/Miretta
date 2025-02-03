import { useAppDispatch } from "@/redux/types";
import { FC, useState } from "react";
import { authWithEmailPassword, authWithProvider } from "../../redux/thunks";

type Props = {};

const SignUpForm: FC<Props> = ({}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
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
        onClick={() =>
          dispatch(authWithEmailPassword({ type: "signUp", email, password }))
        }
      >
        Sign Up
      </button>
      <button
        onClick={() =>
          dispatch(authWithProvider({ type: 'google' }))
        }
      >
        Sign Up with Google
      </button>
    </div>
  );
};

export default SignUpForm;
