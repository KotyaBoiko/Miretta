import { setAuth } from "@/features/auth/redux/slices/authSlice";
import { auth } from "@/firebase/firebase-config";
import { baseApi } from "@/redux/baseApi";
import { useAppDispatch } from "@/redux/types";
import { COMMON_ROUTES_NAMES } from "@/router/common/commonRoutesNames";
import { onAuthStateChanged } from "firebase/auth";
import { FC, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import { userApi } from "@/features/user/API/userApi";


const Layout: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  useEffect(() => {
    const listener = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setAuth(true));
        dispatch(userApi.util.prefetch('getUser', undefined, {}))
      } else {
        navigate(COMMON_ROUTES_NAMES.Home)
        dispatch(setAuth(false));
        localStorage.clear();
        dispatch(baseApi.util.resetApiState())
      }
    });
    return () => listener();
  }, [dispatch, navigate]);

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
