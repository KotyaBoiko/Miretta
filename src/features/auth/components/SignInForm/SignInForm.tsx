import { FC, useState } from "react";
import { Link, useNavigate } from "react-router";

import MainButton from "@/components/ui/Buttons/MainButton/MainButton";
import CommonInput from "@/components/ui/Input/CommonInput";
import { COMMON_ROUTES_NAMES } from "@/router/common/commonRoutesNames";

import GitHubIcon from "@/assets/icons/GitHub.svg?react";
import GoogleIcon from "@/assets/icons/Google.svg?react";
import Loader from "@/components/ui/Loader/Loader";
import { useAppDispatch, useAppSelector } from "@/redux/types";
import {
  authWithEmailPassword,
  authWithProvider,
} from "../../slices/authSlice";
import classes from "./signInForm.module.scss";

type Props = {
  setIsFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const SignInForm: FC<Props> = ({ setIsFormVisible }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()
  const loading = useAppSelector((state) => state.auth.loading);

  const dispatch = useAppDispatch();

  const handleSignUpClick = () => {
    setIsFormVisible(false);
    navigate(COMMON_ROUTES_NAMES.Auth)
  };

  return (
    <div className={classes.signin__container}>
      <form
        action=""
        className={classes.signin__form}
        onSubmit={(e) => e.preventDefault()}
      >
        <div className={classes.signin__field}>
          <label htmlFor="signin-email">Email:</label>
          <CommonInput
            type="email"
            id="signin-email"
            placeholder="skibidi@gmail.com"
            value={email}
            onChange={setEmail}
          />
        </div>
        <div className={classes.signin__field}>
          <label htmlFor="signin-password">Password:</label>
          <CommonInput
            type="password"
            id="signin-password"
            placeholder="******"
            value={password}
            onChange={setPassword}
          />
        </div>
        <MainButton
          width="full"
          active={loading === "pending"}
          className={classes.signin__entry}
          action={() =>
            dispatch(authWithEmailPassword({ type: "signIn", email, password }))
          }
        >
          {loading === "pending" ? <Loader /> : "Sign In"}
        </MainButton>
      </form>
      <div className={classes.signin__other}>
        <span>Fast method</span>
        <div className={classes.signin__other_icons}>
          <GoogleIcon
            width={40}
            height={40}
            onClick={() => dispatch(authWithProvider({ type: "google" }))}
          />
          <GitHubIcon width={40} height={40} />
        </div>
      </div>
      <div className={classes.signin__signup}>
        <span>-or-</span>
          <MainButton width="full" action={handleSignUpClick}>Sign Up</MainButton>
      </div>
    </div>
  );
};

export default SignInForm;
