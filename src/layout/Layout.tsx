import { FC } from "react";
import { Outlet } from "react-router";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";


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
