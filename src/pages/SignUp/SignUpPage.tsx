import SignUpForm from '@/features/auth/components/SignUpForm/SignUpForm'
import { useAppSelector } from '@/redux/types'
import { USER_ROUTES_NAMES } from '@/router/user/userRoutesNames'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

const SignUpPage = () => {

  const navigate = useNavigate()
  const isAuth = useAppSelector(state => state.auth.isAuth)

  useEffect(() => {
    if (isAuth) {
      navigate(USER_ROUTES_NAMES.Profile, { replace: true })
    }
  }, [isAuth])

  return (
    <SignUpForm/>
  )
}

export default SignUpPage