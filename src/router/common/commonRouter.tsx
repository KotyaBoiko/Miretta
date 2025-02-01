import HomePage from "@/pages/Home/HomePage";
import SignUpPage from "@/pages/SignUp/SignUpPage";
import { COMMON_ROUTES_NAMES } from "./commonRoutesNames";
import ProductsPage from "@/pages/Products/ProductsPage";
import ProductDetailPage from "@/pages/ProductDetail/ProductDetailPage";

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
    element: <div>Cart</div>,
  },
  {
    path: COMMON_ROUTES_NAMES.Auth,
    element: <SignUpPage/>,
  },
];
