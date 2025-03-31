import { Link } from "react-router";
import { profileMenu, TProfileMenu } from "../../libs/profileMenu";
import classes from "./profileNav.module.scss";

type Props = {
  active: TProfileMenu;
  setActive: React.Dispatch<React.SetStateAction<TProfileMenu>>;
};

const ProfileNav: React.FC<Props> = ({ active, setActive }) => {
  return (
    <nav className={classes.profile__menu}>
      {profileMenu.map((item) => {
        return (
          <Link
            to={item.url}
            key={item.menuItem}
            onClick={() => {
              setActive(item);
            }}
            className={
              classes.profile__menu_item +
              " " +
              (active === item ? classes["profile__menu_item-active"] : "")
            }
          >
            {item.menuItem}
          </Link>
        );
      })}
    </nav>
  );
};

export default ProfileNav;
