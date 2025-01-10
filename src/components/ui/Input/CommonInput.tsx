import { FC } from 'react'
import classes from "./commonInput.module.scss"
type Props = {
  type?: string,
  placeholder?: string;
  id?: string
}

const CommonInput:FC<Props> = ({type = "text", placeholder ="", id}) => {
  return (
    <input type={type} placeholder={placeholder} className={classes.commonInput} id={id ? id : ''}/>
  )
}

export default CommonInput