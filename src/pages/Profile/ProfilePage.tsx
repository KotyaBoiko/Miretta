import { FC, useState } from "react";
import classes from "./profile.module.scss";
import ProfileNav from "@/features/user/components/ProfileNav/ProfileNav";
import { Outlet } from "react-router";
import { profileMenu } from "@/features/user/libs/profileMenu";

const ProfilePage: FC = ({}) => {
  const [menuItem, setMenuItem] = useState(profileMenu[0]);

  return (
    <section className={classes.profile}>
      <div className="wrapper">
        <div className={classes.profile__container}>
          <ProfileNav active={menuItem} setActive={setMenuItem} />
          <Outlet context={ menuItem } />
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
