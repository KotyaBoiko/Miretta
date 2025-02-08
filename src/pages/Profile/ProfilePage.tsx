import { FC, useState } from "react";
import classes from "./profile.module.scss";
import ProfileNav from "@/features/user/components/ProfileNav/ProfileNav";
import { Outlet } from "react-router";
import { profileMenu } from "@/features/user/libs/profileMenu";

const ProfilePage: FC = ({}) => {
  const [menuItem, setMenuItem] = useState(profileMenu[0]);
  const [editMode, setEditMode] = useState(false);

  return (
    <section className={classes.profile}>
      <div className="wrapper">
        <div className={classes.profile__container}>
          <h2 className={classes.profile__title}>
            {menuItem.title}
            <span
              className={classes.profile__edit}
              onClick={() => setEditMode((prev) => !prev)}
            >
              
              {editMode ? (
                <>
                  <span className={classes.profile__edit_btn}>Save</span>
                  <span className={classes.profile__edit_btn}>Cancel</span>
                </>
              ) : (
                <span className={classes.profile__edit_btn}>Change</span>
              )}
              
            </span>
          </h2>
          <ProfileNav active={menuItem} setActive={setMenuItem} />
          <div className={classes.profile__content}>
            <Outlet context={editMode} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
