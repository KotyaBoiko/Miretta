import LogOut from '@/features/user/components/LogOut/LogOut';
import { FC } from 'react';
import { useOutletContext } from 'react-router';
import { TOutletProfileData } from '../Profile/ProfilePage';
import classes from './logOutPage.module.scss';
const LogOutPage:FC = () => {
  const {menuItem}:TOutletProfileData = useOutletContext();
  return (
    <>
      <h2 className={classes.profile__title}>{menuItem.title}</h2>
      <LogOut/>
    </>
  )
}

export default LogOutPage