import MainButton from "@/components/ui/Buttons/MainButton/MainButton";
import { logOut } from "@/features/auth/slices/authSlice";
import { auth } from "@/firebase/firebase-config";
import { useAppDispatch } from "@/redux/types";
import { COMMON_ROUTES_NAMES } from "@/router/common/commonRoutesNames";
import { FC } from "react";
import { Link } from "react-router";


const ProfilePage: FC = ({}) => {
  const dispatch = useAppDispatch();
  return (
    <div>
      {auth.currentUser?.email}
      <Link to={COMMON_ROUTES_NAMES.Home} onClick={() => dispatch(logOut())}>
        <MainButton width="content">Sign Out</MainButton>
      </Link>
      <MainButton width="content">
        Add
      </MainButton>
    </div>
  );
};

export default ProfilePage;
