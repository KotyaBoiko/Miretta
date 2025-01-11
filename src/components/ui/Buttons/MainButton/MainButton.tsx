import { FC } from 'react'
import classes from "./mainButton.module.scss"
type Props = {
  text: string,
  width?: 'content' | "medium" | "full"
}

const MainButton:FC<Props> = ({text, width = "medium"}) => {
  return (
    <button className={classes["main-btn"] + " " + classes[`main-btn_${width}`]}>{text}</button>
  )
}

export default MainButton