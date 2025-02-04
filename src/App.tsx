import Layout from "@/layout/Layout";
import { commonRouter } from "@/router/common/commonRouter";
import { onAuthStateChanged } from "firebase/auth";
import { createBrowserRouter, RouterProvider } from "react-router";
import { auth } from "./firebase/firebase-config";

import { useEffect } from "react";
import { setAuth } from "./features/auth/redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "./redux/types";
import { userRouter } from "./router/user/userRouter";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

const App = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(state => state.auth.isAuth)
  useEffect(() => {
    const listener = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setAuth(true));
      } else {
        dispatch(setAuth(false));
      }
    });
    return () => listener();
  }, []);

const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: auth.currentUser || isAuth ? userRouter : commonRouter,
      errorElement: <ErrorPage/>,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
