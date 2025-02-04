import CommonInput from "@/components/ui/Input/CommonInput";
import classes from "./authForm.module.scss";
import { FC, useEffect, useState } from "react";
import MainButton from "@/components/ui/Buttons/MainButton/MainButton";
import { useAppDispatch, useAppSelector } from "@/redux/types";
import Loader from "@/components/ui/Loader/Loader";
import { authWithEmailPassword } from "../../redux/thunks";

type Props = {
  type: "signIn" | "signUp";
};

const AuthForm: FC<Props> = ({ type }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState('')

  const loading = useAppSelector((state) => state.auth.loading);
  const dispatch = useAppDispatch()

  useEffect(() => {
    document.body.classList.add("modal-active");
    return () => document.body.classList.remove("modal-active");
  }, []);

  const authorization = () => {
    if (type === "signUp" && password != repeatedPassword) {
      alert("Password not matched")
    } else {
      dispatch(authWithEmailPassword({type, email, password}))
    }
  }


  return (
    <form
      action=""
      className={classes.auth__form}
      onSubmit={(e) => e.preventDefault()}
    >
      <label className={classes.auth__form_field}>
        <span>Email:</span>
        <CommonInput
          type="email"
          placeholder="skibidi@gmail.com"
          value={email}
          onChange={setEmail}
        />
      </label>
      <label className={classes.auth__form_field}>
        <span>Password:</span>
        <CommonInput
          type="password"
          placeholder="******"
          value={password}
          onChange={setPassword}
        />
      </label>
      {type === "signUp" ? (
        <label className={classes.auth__form_field}>
          <span>Repeat password:</span>
          <CommonInput
            type="password"
            placeholder="******"
            value={repeatedPassword}
            onChange={setRepeatedPassword}
          />
        </label>
      ) : (
        <></>
      )}
      <MainButton
        width="full"
        active={loading === "pending"}
        className={classes.auth__form_submit}
        action={authorization}
      >
        {
        loading === "pending" 
        ? <Loader /> 
        : type === "signIn" ? "Sign In" : "Sign Up"
        }
      </MainButton>
    </form>
  );
};

export default AuthForm;
