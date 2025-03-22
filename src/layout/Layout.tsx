import { setAuth } from "@/features/auth/redux/slices/authSlice";
import { collectionApi } from "@/features/collections/collectionApi";
import { userApi } from "@/features/user/API/userApi";
import { auth } from "@/firebase/firebase-config";
import { baseApi } from "@/redux/API/baseApi";
import { useAppDispatch, useAppSelector } from "@/redux/types";
import { COMMON_ROUTES_NAMES } from "@/router/common/commonRoutesNames";
import { onAuthStateChanged } from "firebase/auth";
import { FC, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";


const Layout: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();

const logOutLoading = useAppSelector(state => state.auth.loadingLogOut)

useEffect (() => {
  if (logOutLoading === 'succeeded') {
    dispatch(baseApi.util.resetApiState())
    dispatch(collectionApi.endpoints.getCollections.initiate())
    navigate(COMMON_ROUTES_NAMES.Home)
    dispatch(setAuth(false));
    localStorage.removeItem('user');
    localStorage.removeItem('wishlist');
  }
}, [logOutLoading])
  
  useEffect(() => {
    const listener = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setAuth(true));
        dispatch(userApi.util.prefetch('getUser', undefined, {}))
      } else {
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
