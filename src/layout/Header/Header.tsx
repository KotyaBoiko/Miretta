import { FC, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";

import CartIcon from "@/assets/icons/Cart.svg?react";
import ProfileIcon from "@/assets/icons/Profile.svg?react";
import Modal from "@/components/ui/Modal/Modal";
import SignInForm from "@/features/auth/components/SignInForm/SignInForm";
import { useAppSelector } from "@/redux/types";
import { COMMON_ROUTES_NAMES } from "@/router/common/commonRoutesNames";
import { USER_ROUTES_NAMES } from "@/router/user/userRoutesNames";
import classes from "./header.module.scss";

const Header: FC = () => {
  const isAuth = useAppSelector(state => state.auth.isAuth)
  let navigate = useNavigate();
  const location = useLocation();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const openProfile = () => {
    if(isAuth) {
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
            <Modal isOpen={isAuthModalOpen && !isAuth} onClose={closeAuthModal} classNameContent={classes.header_auth}>
              <SignInForm isFormVisible={setIsAuthModalOpen}/>
            </Modal>
            <CartIcon className={classes.header_cart} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
