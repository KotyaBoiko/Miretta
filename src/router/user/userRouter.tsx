import { userApi } from "@/features/user/API/userApi";
import PersonalInfo from "@/features/user/components/PersonalInfo/PersonalInfo";
import ProfilePage from "@/pages/Profile/ProfilePage";
import { store } from "@/redux/store";
import { commonRouter } from "../common/commonRouter";
import { USER_ROUTES_NAMES } from "./userRoutesNames";
import LogOutPage from "@/pages/LogOut/LogOutPage";

export const userRouter = [
  ...commonRouter,
  {
    path: USER_ROUTES_NAMES.Profile,
    element: <ProfilePage />,
    loader: async () => {
      const promise = store.dispatch(userApi.endpoints.getUser.initiate())
      await promise;
      promise.unsubscribe()
    },
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
        element: <LogOutPage/>
      }
    ]
  },
];
