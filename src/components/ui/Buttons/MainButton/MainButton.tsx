import { FC } from 'react'
import classes from "./mainButton.module.scss"
type Props = {
  children: string | React.ReactNode,
  width?: 'content' | "medium" | "full"
}

const MainButton:FC<Props> = ({children, width = "medium"}) => {
  return (
    <button className={classes["main-btn"] + " " + classes[`main-btn_${width}`]}>{children}</button>
  )
}

export default MainButton