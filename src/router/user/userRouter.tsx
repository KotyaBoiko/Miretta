import ProfilePage from "@/pages/Profile/ProfilePage";
import { commonRouter } from "../common/commonRouter";
import { USER_ROUTES_NAMES } from "./userRoutesNames";
import PersonalInfo from "@/features/user/components/PersonalInfo/PersonalInfo";

export const userRouter = [
  ...commonRouter,
  {
    path: USER_ROUTES_NAMES.Profile,
    element: <ProfilePage />,
    children: [
      {
        index: true,
        element: <PersonalInfo/>
      },
      {
        path: USER_ROUTES_NAMES.Orders,
        element: <PersonalInfo/>
      },
      {
        path: USER_ROUTES_NAMES.OrdersHistory,
        element: <PersonalInfo/>
      },
      {
        path: USER_ROUTES_NAMES.Addresses,
        element: <PersonalInfo/>
      },
      {
        path: USER_ROUTES_NAMES.LogOut,
        element: <PersonalInfo/>
      }
    ]
  },
];
