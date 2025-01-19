import classes from './loader.module.scss'
import Loader1 from '@/assets/icons/loading-spinner-svgrepo-com.svg?react'
const Loader = () => {
  return (
      <Loader1 className={classes.loader}/>
  )
}

export default Loader