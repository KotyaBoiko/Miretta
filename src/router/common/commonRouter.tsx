import HomePage from "../../pages/Home/HomePage";
import { COMMON_ROUTES_NAMES } from "./commonRoutesNames";

export const commonRouter = [
  {
    path: COMMON_ROUTES_NAMES.Home,
    element: <HomePage/>,
  },
  {
    path: COMMON_ROUTES_NAMES.Shirts,
    element: <div>Shirts</div>,
  },
  {
    path: COMMON_ROUTES_NAMES.Outerwear,
    element: <div>Outerwear</div>,
  },
  {
    path: COMMON_ROUTES_NAMES.Bottoms,
    element: <div>Bottoms</div>,
  },
  {
    path: COMMON_ROUTES_NAMES.Caps,
    element: <div>Caps</div>,
  },
  {
    path: COMMON_ROUTES_NAMES.Cart,
    element: <div>Cart</div>,
  },
];
