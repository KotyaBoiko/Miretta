import { FC } from 'react'
import { Link } from 'react-router'

import { COMMON_ROUTES_NAMES } from '@/router/common/commonRoutesNames'
import CommonInput from '@/components/ui/Input/CommonInput'
import MainButton from '@/components/ui/Buttons/MainButton/MainButton'

import classes from "./signInForm.module.scss"
import GoogleIcon from "@/assets/icons/Google.svg?react"
import GitHubIcon from "@/assets/icons/GitHub.svg?react"

const SignInForm:FC = () => {

  return (
      <div className={classes.signin_container}>
        <form action="" className={classes.signin_form}>
          <div className={classes.signin_field}>
            <label htmlFor="signin-email">Email:</label>
            <CommonInput type="email" id="signin-email" placeholder='skibidi@gmail.com'/>
          </div>
          <div className={classes.signin_field}>
            <label htmlFor="signin-password">Password:</label>
            <CommonInput type="text" id="signin-password" placeholder='******'/>
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
  )
}

export default SignInForm