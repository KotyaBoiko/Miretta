import classes from './fastAuth.module.scss'
import GitHubIcon from "@/assets/icons/github.svg?react";
import GoogleIcon from "@/assets/icons/google.svg?react";
import { useAppDispatch } from '@/redux/types';
import { FC } from 'react';
import { authWithProvider } from '../../redux/thunks';

const FastAuth:FC = () => {

  const dispatch = useAppDispatch()

  return (
    <div className={classes.auth__fast}>
    <span>Fast method</span>
    <div className={classes.auth__fast_icons}>
      <GoogleIcon
        width={40}
        height={40}
        onClick={() => dispatch(authWithProvider({ type: "google" }))}
      />
      <GitHubIcon width={40} height={40} />
    </div>
  </div>
  )
}

export default FastAuth