import { logOut } from "@/features/auth/redux/thunks";
import { useAppDispatch, useAppSelector } from "@/redux/types";
import MainButton from "../ui/Buttons/MainButton/MainButton";
import Loader from "../ui/Loader/Loader";

const LogOutButton = () => {
  const loadingLogOut = useAppSelector((state) => state.auth.loadingLogOut);
  const dispatch = useAppDispatch()
  return (
    <MainButton action={() => dispatch(logOut())}>
      {loadingLogOut === "pending" ? <Loader /> : "Log Out"}
    </MainButton>
  );
};

export default LogOutButton;
