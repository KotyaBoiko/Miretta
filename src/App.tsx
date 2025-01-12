import Layout from "@/layout/Layout";
import { commonRouter } from "@/router/common/commonRouter";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { auth } from "./firebase/firebase-config";
import { setAuth } from "./redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { userRouter } from "./router/user/userRouter";

const App = () => {
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const listener = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setAuth(true));
      } else {
        dispatch(setAuth(false));
      }
    });

    return () => {
      listener();
    };
  }, []);

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
