import MainButton from "@/components/ui/Buttons/MainButton/MainButton";
import { signOutUser } from "@/features/auth/services/authService";
import { auth } from "@/firebase/firebase-config";
import { COMMON_ROUTES_NAMES } from "@/router/common/commonRoutesNames";
import { FC } from "react";
import { Link } from "react-router";

const ProfilePage: FC = ({}) => {

  return <div>
    {auth.currentUser ? auth.currentUser.email: "no user"}
    <Link to={COMMON_ROUTES_NAMES.Home} onClick={signOutUser}>
      <MainButton text="SignOut" width="content"/>
    </Link>
    </div>;
};

export default ProfilePage;
