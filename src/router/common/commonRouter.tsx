import CartPage from "@/pages/Cart/CartPage";
import HomePage from "@/pages/Home/HomePage";
import ProductDetailPage from "@/pages/ProductDetail/ProductDetailPage";
import ProductsPage from "@/pages/Products/ProductsPage";
import { COMMON_ROUTES_NAMES } from "./commonRoutesNames";

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
  },
];
