import { FC } from 'react'
import classes from './addressItem.module.scss';
import LocationIcon from '@/assets/icons/location.svg?react'
import EditIcon from '@/assets/icons/edit.svg?react'
import DeleteIcon from '@/assets/icons/delete.svg?react'

type Props = {
  order: number,
}

const AddressItem:FC<Props> = ({order}) => {
  return (
    <div className={classes.address__item}>
      <span className={classes.address__number}>Address №{order}</span>
        <div className={classes.address__info}>
          <LocationIcon className={classes.address__icon}/>
          <p className={classes.address__text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus dolore iste perferendis aperiam tempore cupiditate reprehenderit sunt officia sapiente laudantium, in odit dolorum, ipsum, minima voluptatibus ad earum! Dolorem, quod.</p>
          <div className={classes.address__interactive}>
            <EditIcon className={classes.address__icon}/>
            <DeleteIcon className={classes.address__icon}/>
          </div>
        </div>
    </div>
  )
}

export default AddressItem