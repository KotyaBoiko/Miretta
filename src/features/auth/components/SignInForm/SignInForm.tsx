import { FC, useState } from "react";
import { Link } from "react-router";

import { COMMON_ROUTES_NAMES } from "@/router/common/commonRoutesNames";
import CommonInput from "@/components/ui/Input/CommonInput";
import MainButton from "@/components/ui/Buttons/MainButton/MainButton";

import classes from "./signInForm.module.scss";
import GoogleIcon from "@/assets/icons/Google.svg?react";
import GitHubIcon from "@/assets/icons/GitHub.svg?react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebase-config";

const SignInForm: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInWithEmailPassword = async () => {
    try {
      const data = await signInWithEmailAndPassword(auth, email, password)
       console.log(data)
       setEmail("")
       setPassword("")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={classes.signin_container}>
      <form action="" className={classes.signin_form} onSubmit={(e) => e.preventDefault()}>
        <div className={classes.signin_field}>
          <label htmlFor="signin-email">Email:</label>
          <CommonInput
            type="email"
            id="signin-email"
            placeholder="skibidi@gmail.com"
            value={email}
            onChange={setEmail}
          />
        </div>
        <div className={classes.signin_field}>
          <label htmlFor="signin-password">Password:</label>
          <CommonInput
            type="text"
            id="signin-password"
            placeholder="******"
            value={password}
            onChange={setPassword}
          />
        </div>
        <div className={classes.signin_entry} onClick={signInWithEmailPassword}>
          <MainButton text="Sign In" width="full" />
        </div>
      </form>
      <div className={classes.signin_other}>
        <p className={classes.signin_other__title}>Fast method</p>
        <div className={classes.signin_other__icons}>
          <GoogleIcon width={40} height={40} />
          <GitHubIcon width={40} height={40} />
        </div>
      </div>
      <div className={classes.signin_signup}>
        <p className={classes.signin_signup__text}>-or-</p>
        <Link to={COMMON_ROUTES_NAMES.Auth}>
          <MainButton text="Sign Up" width="full" />
        </Link>
      </div>
    </div>
  );
};

export default SignInForm;
