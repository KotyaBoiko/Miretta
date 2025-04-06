import Layout from "@/layout/Layout";
import { commonRouter } from "@/router/common/commonRouter";
import { createBrowserRouter, RouterProvider } from "react-router";
import { auth } from "./firebase/firebase-config";

import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { setAuth, setAuthReady } from "./features/auth/redux/slices/authSlice";
import { cartApi } from "./features/cart/API/cartApi";
import { productApi } from "./features/products/Api/productApi";
import { userApi } from "./features/user/API/userApi";
import { store } from "./redux/store";
import { useAppDispatch, useAppSelector } from "./redux/types";
import { userRouter } from "./router/user/userRouter";

const App = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const isAuthReady = useAppSelector((state) => state.auth.isAuthReady);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const listener = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setAuth(true));
        dispatch(setAuthReady(true));
        dispatch(userApi.util.prefetch("getUser", undefined, {}));
      } else {
        dispatch(setAuthReady(true));
      }
    });
    return () => listener();
  }, [dispatch]);

  const router = isAuthReady
    ? createBrowserRouter([
        {
          path: "/",
          element: <Layout />,
          children: auth.currentUser || isAuth ? userRouter : commonRouter,
          loader: () => {
            if (auth.currentUser) {
              store.dispatch(cartApi.util.prefetch("getCart", undefined, {}));
              store.dispatch(
                productApi.util.prefetch("getWishlist", undefined, {})
              );
            }
            return null;
          },
        },
      ])
    : null;

  return router ? <RouterProvider router={router} /> : null;
};

export default App;
