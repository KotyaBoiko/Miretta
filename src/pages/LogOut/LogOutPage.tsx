import { TProfileMenu } from '@/features/user/libs/profileMenu';
import { FC } from 'react'
import { useOutletContext } from 'react-router'
import classes from './logOutPage.module.scss'
import LogOut from '@/features/user/components/LogOut/LogOut';
const LogOutPage:FC = () => {
  const menuItem: TProfileMenu = useOutletContext();
  return (
    <>
      <h2 className={classes.profile__title}>{menuItem.title}</h2>
      <LogOut/>
    </>
  )
}

export default LogOutPage