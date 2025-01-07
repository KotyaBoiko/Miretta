import { FC } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router";
import MySwiper from "../MySwiper/MySwiper";

const Layout: FC = () => {
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
