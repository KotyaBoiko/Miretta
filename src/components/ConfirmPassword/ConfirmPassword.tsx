import { FC, SetStateAction, useState } from "react";
import CommonInput from "../ui/Input/CommonInput";
import classes from "./confirmPassword.module.scss";
import MainButton from "../ui/Buttons/MainButton/MainButton";
import { useReAuthUserMutation } from "@/features/user/API/userApi";
import Loader from "../ui/Loader/Loader";

type Props = {
  setIsConfirmedPassword: React.Dispatch<SetStateAction<boolean>>,
  setCheckingPassword: React.Dispatch<SetStateAction<boolean>>,
}

const ConfirmPassword:FC<Props> = ({setIsConfirmedPassword, setCheckingPassword}) => {
  const [password, setPassword] = useState('')
  const [reAuthUser, {isLoading}] = useReAuthUserMutation()
  const checkPassword = async () => {
      const result = await reAuthUser(password)
      if (result.data === true) {
        setIsConfirmedPassword(true)
        setCheckingPassword(false)
      } else {
        alert(result.error)
      }
  }
  return (
    <div className={classes.confirm__password_container}>
      <h2 className={classes.confirm__password_title}>Confirm your password for continue</h2>
      <form className={classes.confirm__password_form} onSubmit={(e) => e.preventDefault()}>
        <CommonInput
        type="password"
        value={password}
        onChange={setPassword}
        placeholder="PASSWORD"
        />
        <div className={classes.confirm__password_btns}>
          <MainButton action={checkPassword} width="medium">{isLoading ? <Loader/> : "Confirm"}</MainButton>
          <MainButton action={() => setCheckingPassword(false)} width="medium">Cancel</MainButton>
        </div>
      </form>
    </div>
  );
};

export default ConfirmPassword;
