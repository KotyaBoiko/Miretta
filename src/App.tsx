import Layout from "@/layout/Layout";
import { commonRouter } from "@/router/common/commonRouter";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { createBrowserRouter, redirect, RouterProvider, useNavigate } from "react-router";
import { auth } from "./firebase/firebase-config";
import { userRouter } from "./router/user/userRouter";
import { USER_ROUTES_NAMES } from "./router/user/userRoutesNames";
import { COMMON_ROUTES_NAMES } from "./router/common/commonRoutesNames";

const App = () => {
  const [isAuth, setIsAuth] = useState(true)
  useEffect(() => {
    const listener = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user)
        setIsAuth(true)
        redirect(USER_ROUTES_NAMES.Profile)
      } else {
        setIsAuth(false)
        redirect(COMMON_ROUTES_NAMES.Home)
      }
    });

    return () => {
      listener()
    }
  }, [])

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: isAuth ? userRouter : commonRouter,
      errorElement: <div>404</div>,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
