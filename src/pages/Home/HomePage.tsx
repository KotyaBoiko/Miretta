import { FC } from 'react'
import classes from './home.module.scss'

const HomePage:FC = () => {
  return (
    <div className={classes.home_main}>
      <div className={classes.home_main__top}>
        <h1 className={classes.home_main__logo}>MIRETTA</h1>
      </div>
      <div className={classes.home_main__bottom}></div>
    </div>
  )
}

export default HomePage