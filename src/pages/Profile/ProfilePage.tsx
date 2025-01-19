import MainButton from "@/components/ui/Buttons/MainButton/MainButton";
import { logOut } from "@/features/auth/slices/authSlice";
import { auth } from "@/firebase/firebase-config";
import { useAppDispatch, useAppSelector } from "@/redux/types";
import { COMMON_ROUTES_NAMES } from "@/router/common/commonRoutesNames";
import { FC, useEffect } from "react";
import { Link, useNavigate } from "react-router";

const ProfilePage: FC = ({}) => {
  const dispatch = useAppDispatch()

  return <div>
    {auth.currentUser?.email}
    <Link to={COMMON_ROUTES_NAMES.Home} onClick={() => dispatch(logOut())}>
      <MainButton width="content">Sign Out</MainButton>
    </Link>
    <MainButton width="content" active={true}>Sign</MainButton>
    </div>;
};

export default ProfilePage;
