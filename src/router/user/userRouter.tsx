import ProfilePage from "@/pages/Profile/ProfilePage";
import { commonRouter } from "../common/commonRouter";
import { USER_ROUTES_NAMES } from "./userRoutesNames";

export const userRouter = [
  ...commonRouter,
  {
    path: USER_ROUTES_NAMES.Profile,
    element: <ProfilePage />,
  },
];
