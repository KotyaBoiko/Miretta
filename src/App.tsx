import Layout from "@/layout/Layout";
import { commonRouter } from "@/router/common/commonRouter";
import { createBrowserRouter, RouterProvider } from "react-router";
import { auth } from "./firebase/firebase-config";

import { useAppSelector } from "./redux/types";
import { userRouter } from "./router/user/userRouter";
import { store } from "./redux/store";
import { cartApi } from "./features/cart/API/cartApi";
import { productApi } from "./features/products/Api/productApi";

const App = () => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: auth.currentUser || isAuth ? userRouter : commonRouter,
      loader: () => {
        if (auth.currentUser) {
        store.dispatch(cartApi.util.prefetch('getCart', undefined, {}))
        store.dispatch(productApi.util.prefetch('getWishlist', undefined, {}))
        }
        return null;
      },
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
