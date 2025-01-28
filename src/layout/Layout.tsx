import { FC } from "react";
import { Outlet } from "react-router";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";


const Layout: FC = () => {
  return (
    <div className="global__wrapper">
      <Header />
      <Outlet />
      <Footer />
      <div className="line line-left"></div>
      <div className="line line-right"></div>
    </div>
  );
};

export default Layout;
