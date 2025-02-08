import { USER_ROUTES_NAMES } from "@/router/user/userRoutesNames";

export type TProfileMenu = {
  menuItem: string,
  title: string,
  url: USER_ROUTES_NAMES,
}

export const profileMenu:TProfileMenu[] = [
  {
    menuItem: "Personal data",
    title: 'My personal information',
    url: USER_ROUTES_NAMES.Profile
  },
  {
    menuItem: "My orders",
    title: 'My active orders',
    url: USER_ROUTES_NAMES.Orders
  },
  {
    menuItem: "Order history",
    title: 'My all orders',
    url: USER_ROUTES_NAMES.OrdersHistory
  },
  {
    menuItem: "Addresses",
    title: 'All addresses for delivery',
    url: USER_ROUTES_NAMES.Addresses
  },
  {
    menuItem: "Log Out",
    title: 'Log Out',
    url: USER_ROUTES_NAMES.LogOut
  },
];