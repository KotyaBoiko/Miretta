import MainButton from "@/components/ui/Buttons/MainButton/MainButton";
import { logOut } from "@/features/auth/slices/authSlice";
import { auth, db } from "@/firebase/firebase-config";
import { useAppDispatch } from "@/redux/types";
import { COMMON_ROUTES_NAMES } from "@/router/common/commonRoutesNames";
import { FC } from "react";
import { Link } from "react-router";
import { collection, addDoc, getDocs } from "firebase/firestore";

const ProfilePage: FC = ({}) => {
  const dispatch = useAppDispatch();

  const getCollections = async () => {
    const querySnapshot = await getDocs(collection(db, "collections"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      console.log(doc);
    });
  };

  return (
    <div>
      {auth.currentUser?.email}
      <Link to={COMMON_ROUTES_NAMES.Home} onClick={() => dispatch(logOut())}>
        <MainButton width="content">Sign Out</MainButton>
      </Link>
      <MainButton width="content" action={getCollections}>
        Add
      </MainButton>
    </div>
  );
};

export default ProfilePage;
