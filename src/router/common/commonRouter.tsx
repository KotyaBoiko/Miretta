import { cartApi } from "@/features/cart/API/cartApi";
import CartPage from "@/pages/Cart/CartPage";
import HomePage from "@/pages/Home/HomePage";
import ProductDetailPage from "@/pages/ProductDetail/ProductDetailPage";
import ProductsPage from "@/pages/Products/ProductsPage";
import { store } from "@/redux/store";
import { COMMON_ROUTES_NAMES } from "./commonRoutesNames";
import { auth } from "@/firebase/firebase-config";

export const commonRouter = [
  {
    path: COMMON_ROUTES_NAMES.Home,
    element: <HomePage/>,
  },
  {
    path: COMMON_ROUTES_NAMES.Category + '/:category',
    element: <ProductsPage/>
  },
  {
    path: COMMON_ROUTES_NAMES.Collection + '/:collection',
    element: <ProductsPage/>
  },
  {
    path: COMMON_ROUTES_NAMES.Product + '/:id',
    element: <ProductDetailPage/>
  },
  {
    path: COMMON_ROUTES_NAMES.Cart,
    element: <CartPage/>,
    loader: async () => {
      if (auth.currentUser) {
        const result = store.dispatch(cartApi.endpoints.getCart.initiate());
        await result;
        result.unsubscribe();
      }
      return null;
    }
  },
];
