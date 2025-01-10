import { FC } from 'react'

import classes from "./signInForm.module.scss"
import { COMMON_ROUTES_NAMES } from '@/router/common/commonRoutesNames'
import { Link } from 'react-router'
import CommonInput from '@/components/ui/Input/CommonInput'
import MainButton from '@/components/ui/Buttons/MainButton/MainButton'
import GoogleIcon from "@/assets/icons/Google.svg?react"
import GitHubIcon from "@/assets/icons/GitHub.svg?react"
type Props = {
  setIsVisibleForm: React.Dispatch<React.SetStateAction<boolean>>
}

const SignInForm:FC<Props> = ({setIsVisibleForm}) => {

  return (
    <div className={classes.signin_wrapper}>
      <div className={classes.signin_container}>
        <form action="" className={classes.signin_form}>
          <div className={classes.signin_field}>
            <label htmlFor="signin-email">Email:</label>
            <CommonInput type="email" id="signin-email" placeholder='collet.email@gmail.com'/>
          </div>
          <div className={classes.signin_field}>
            <label htmlFor="signin-password">Password:</label>
            <CommonInput type="text" id="signin-password" placeholder='Something genius'/>
          </div>
          <div className={classes.signin_entry}>
            <MainButton text='Sign In' width='full'/>
          </div>
        </form>
        <div className={classes.signin_other}>
          <p className={classes.signin_other__title}>Fast method</p>
          <div className={classes.signin_other__icons}>
            <GoogleIcon width={40} height={40}/>
            <GitHubIcon width={40} height={40}/>
          </div>
        </div>
        <div className={classes.signin_signup}>
          <p className={classes.signin_signup__text}>-or-</p>
          <Link to={COMMON_ROUTES_NAMES.Auth}>
          <MainButton text='Sign Up' width='full'/>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignInForm