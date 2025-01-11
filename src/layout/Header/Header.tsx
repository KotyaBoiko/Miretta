import { FC, useState } from "react";
import { Link, redirect, useLocation, useNavigate } from "react-router";

import classes from "./header.module.scss";
import ProfileIcon from "@/assets/icons/Profile.svg?react";
import CartIcon from "@/assets/icons/Cart.svg?react";
import { COMMON_ROUTES_NAMES } from "@/router/common/commonRoutesNames";
import SignInForm from "@/features/auth/components/SignInForm/SignInForm";
import Modal from "@/components/ui/Modal/Modal";
import { auth } from "@/firebase/firebase-config";
import { USER_ROUTES_NAMES } from "@/router/user/userRoutesNames";

const Header: FC = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const openProfile = () => {
    if(auth.currentUser) {
      navigate(USER_ROUTES_NAMES.Profile)
    } else {
      setIsAuthModalOpen(true)
    }
  }

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

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
            <ProfileIcon
              className={classes.header_profile}
              onClick={openProfile}
            />
            <Modal isOpen={isAuthModalOpen} onClose={closeAuthModal} classNameContent={classes.header_auth}>
              <SignInForm />
            </Modal>
            <CartIcon className={classes.header_cart} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
