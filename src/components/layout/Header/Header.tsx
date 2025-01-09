import { FC } from "react";
import { Link, useLocation } from "react-router";

import classes from "./header.module.scss";
import ProfileIcon from "@/assets/img/icons/Profile.svg?react";
import CartIcon from "@/assets/img/icons/Cart.svg?react";
import { COMMON_ROUTES_NAMES } from "@/router/common/commonRoutesNames";

const Header: FC = () => {
  return (
    <header className={classes.header}>
      <div className="wrapper">
        <div className={classes.header_container}>
          <nav className={classes.header_nav}>
            <Link
              to={COMMON_ROUTES_NAMES.Shirts}
              className={classes.header_nav__link}
            >
              Shirts & Tops
            </Link>
            <Link
              to={COMMON_ROUTES_NAMES.Outerwear}
              className={classes.header_nav__link}
            >
              Outerwear
            </Link>
            <Link
              to={COMMON_ROUTES_NAMES.Bottoms}
              className={classes.header_nav__link}
            >
              Bottoms
            </Link>
            <Link
              to={COMMON_ROUTES_NAMES.Caps}
              className={classes.header_nav__link}
            >
              Caps
            </Link>
          </nav>
          {location.pathname != "/" && (
            <Link to={COMMON_ROUTES_NAMES.Home} className={classes.header_logo}>
              MIRETTA
            </Link>
          )}
          <div className={classes.header_interactive}>
            <Link to={COMMON_ROUTES_NAMES.Auth}>
              <ProfileIcon className={classes.header_profile} />
            </Link>
            <CartIcon className={classes.header_cart} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
