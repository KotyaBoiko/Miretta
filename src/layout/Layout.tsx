import { FC, useEffect } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Outlet, useNavigate } from "react-router";
import { useAppSelector } from "@/redux/store";
import { USER_ROUTES_NAMES } from "@/router/user/userRoutesNames";

const Layout: FC = () => {

  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate(USER_ROUTES_NAMES.Profile);
    }
  }, [isAuth]);

  return (
    <div className="global_wrapper">
      <Header />
        <Outlet />
      <Footer />
      <div className="line line_left"></div>
      <div className="line line_right"></div>
    </div>
  );
};

export default Layout;
