import ProfileNav from "@/features/user/components/ProfileNav/ProfileNav";
import { profileMenu, TProfileMenu } from "@/features/user/libs/profileMenu";
import { FC, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import classes from "./profile.module.scss";
import { auth } from "@/firebase/firebase-config";
import { COMMON_ROUTES_NAMES } from "@/router/common/commonRoutesNames";
import { useGetUserQuery } from "@/features/user/API/userApi";
import { IUser } from "@/features/user/types";

export type TOutletProfileData = {
  menuItem: TProfileMenu,
  data: IUser,
}

const ProfilePage: FC = ({}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const {data, isError} = useGetUserQuery();
  const [menuItem, setMenuItem] = useState(
    profileMenu.find((item) => {
      return location.pathname.endsWith(item.url);
    }) || profileMenu[0]
  );

  useEffect(() => {
    if (!auth.currentUser || isError) {
      navigate(COMMON_ROUTES_NAMES.Home)
    }
  }, [])

  return (
    <section className={classes.profile}>
      <div className="wrapper">
        <div className={classes.profile__container}>
          <ProfileNav active={menuItem} setActive={setMenuItem} />
          <Outlet context={{menuItem: menuItem, data: data} as TOutletProfileData} />
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
