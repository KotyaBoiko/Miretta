import { COMMON_ROUTES_NAMES } from '@/router/common/commonRoutesNames';
import { useEffect } from 'react'
import { useNavigate } from 'react-router';

const ErrorPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
      navigate(COMMON_ROUTES_NAMES.Home)
  }, [])

  return (
    <div>ErrorPage</div>
  )
}

export default ErrorPage