import { FC, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";

import CartIcon from "@/assets/icons/Cart.svg?react";
import ProfileIcon from "@/assets/icons/Profile.svg?react";
import AuthModal from "@/features/auth/components/AuthModal/AuthModal";
import { useAppSelector } from "@/redux/types";
import { COMMON_ROUTES_NAMES } from "@/router/common/commonRoutesNames";
import { USER_ROUTES_NAMES } from "@/router/user/userRoutesNames";
import classes from "./header.module.scss";

const types = [
  ["Tops", "Shirts & Tops"],
  ["Sweaters", "Sweaters"],
  ["Bottoms", "Bottoms"],
  ["Caps", "Caps"],
];

const Header: FC = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  let navigate = useNavigate();
  const location = useLocation();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authType, setAuthType] = useState<'signIn' | 'signUp'>('signIn')
  const openProfile = () => {
    if (isAuth) {
      navigate(USER_ROUTES_NAMES.Profile);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  {
    types.map((type) => {
      return (
        <Link to={COMMON_ROUTES_NAMES.Category + type[0]} key={type[0]}>
          {type[1]}
        </Link>
      );
    });
  }
  return (
    <header className={classes.header}>
      <div className="wrapper">
        <div className={classes.header__container}>
          <nav className={classes.header__nav}>
            {types.map((type) => {
              return (
                <Link
                  to={
                    COMMON_ROUTES_NAMES.Category + `/${type[0].toLowerCase()}`
                  }
                  key={type[0]}
                  className={classes.header__nav_link}
                >
                  {type[1]}
                </Link>
              );
            })}
          </nav>
          {location.pathname != "/" && (
            <Link
              to={COMMON_ROUTES_NAMES.Home}
              className={classes.header__logo}
            >
              MIRETTA
            </Link>
          )}
          <div className={classes.header__interactive}>
            <ProfileIcon
              className={classes.header__profile}
              onClick={openProfile}
            />
            <AuthModal
              type={authType}
              setAuthType={setAuthType}
              closeAuthModal={setIsAuthModalOpen}
              isAuthModalOpen={isAuthModalOpen}
            />
            <CartIcon className={classes.header__cart} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
