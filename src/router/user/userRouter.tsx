import HomePage from "@/pages/Home/HomePage";
import ProfilePage from "@/pages/Profile/ProfilePage";
import { USER_ROUTES_NAMES } from "./userRoutesNames";

export const userRouter = [
  {
    path: USER_ROUTES_NAMES.Home,
    element: <HomePage/>,
  },
  {
    path: USER_ROUTES_NAMES.Shirts,
    element: <div>Shirts</div>,
  },
  {
    path: USER_ROUTES_NAMES.Outerwear,
    element: <div>Outerwear</div>,
  },
  {
    path: USER_ROUTES_NAMES.Bottoms,
    element: <div>Bottoms</div>,
  },
  {
    path: USER_ROUTES_NAMES.Caps,
    element: <div>Caps</div>,
  },
  {
    path: USER_ROUTES_NAMES.Cart,
    element: <div>Cart</div>,
  },
  {
    path: USER_ROUTES_NAMES.Profile,
    element: <ProfilePage/>,
  },
];
