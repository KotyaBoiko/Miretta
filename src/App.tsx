import Layout from "@/layout/Layout";
import { commonRouter } from "@/router/common/commonRouter";
import { createBrowserRouter, RouterProvider } from "react-router";
import { auth } from "./firebase/firebase-config";

import { useAppSelector } from "./redux/types";
import { userRouter } from "./router/user/userRouter";

const App = () => {
  const isAuth = useAppSelector(state => state.auth.isAuth)
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: auth.currentUser || isAuth ? userRouter : commonRouter,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
