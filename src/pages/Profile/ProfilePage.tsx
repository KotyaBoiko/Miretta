import MainButton from "@/components/ui/Buttons/MainButton/MainButton";
import { auth } from "@/firebase/firebase-config";
import { COMMON_ROUTES_NAMES } from "@/router/common/commonRoutesNames";
import { signOut } from "firebase/auth";
import { FC } from "react";
import { useNavigate } from "react-router";

const ProfilePage: FC = ({}) => {
  const navigate = useNavigate() 
  const signOutUser =  async () => {
    try {
      await signOut(auth)
      navigate(COMMON_ROUTES_NAMES.Home)
    } catch (error) {
      console.log(error)
    }
  }
  return <div>
    {auth.currentUser ? auth.currentUser.email: "no user"}
    <div onClick={signOutUser}>
      <MainButton text="SignOut" width="content"/>
    </div>
    </div>;
};

export default ProfilePage;
