import { FC, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";

import CartIcon from "@/assets/icons/cart.svg?react";
import LikeIcon from "@/assets/icons/heart2.svg?react";
import ProfileIcon from "@/assets/icons/profile.svg?react";
import BurgerMenu from "@/components/BurgerMenu/BurgerMenu";
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
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  const totalQuantityProductsInCart = useAppSelector(
    (state) => state.cart.totalQuantity
  );
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  let navigate = useNavigate();
  const location = useLocation();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const openProfile = () => {
    if (isAuth) {
      navigate(USER_ROUTES_NAMES.Profile);
    } else {
      setIsAuthModalOpen(true);
    }
  };

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
                  className={`
                    ${classes.header__nav_link} ${
                    location.pathname ==
                    COMMON_ROUTES_NAMES.Category + `/${type[0].toLowerCase()}`
                      ? classes["header__nav_link-active"]
                      : ""
                  }
                      `}
                >
                  {type[1]}
                </Link>
              );
            })}
          </nav>
          <BurgerMenu
            setIsOpen={() => setIsBurgerMenuOpen((p) => !p)}
            isOpen={isBurgerMenuOpen}
            data={types.map((i) => {
              return {
                name: i[1],
                to: COMMON_ROUTES_NAMES.Category + `/${i[0].toLowerCase()}`,
              };
            })}
          />
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
              type={"signIn"}
              closeAuthModal={setIsAuthModalOpen}
              isAuthModalOpen={isAuthModalOpen}
              underProfile
            />
            {isAuth ? (
              <Link
                to={USER_ROUTES_NAMES.Wishlist}
                className={classes.header__like}
              >
                <LikeIcon />
              </Link>
            ) : (
              <LikeIcon onClick={() => setIsAuthModalOpen(true)} />
            )}
            <Link
              to={COMMON_ROUTES_NAMES.Cart}
              className={classes.header__cart}
            >
              <CartIcon />
              <span>
                {totalQuantityProductsInCart ? totalQuantityProductsInCart : ""}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
