import MainButton from '@/components/ui/Buttons/MainButton/MainButton';
import { COMMON_ROUTES_NAMES } from '@/router/common/commonRoutesNames';
import { FC } from 'react';
import { Link } from 'react-router';
import classes from './emptyList.module.scss';

type Props = {
  img: string;
  title: string;
  description: string;
}

const EmptyList:FC<Props> = ({img, title, description}) => {
  return (
    <div className={classes.empty}>
      <img src={img} alt="empty cart" className={classes.empty__img}/>
      <h3 className={classes.empty__title}>
        {title}
      </h3>
      <p className={classes.empty__describe}>
        {description}
      </p>
      <Link to={COMMON_ROUTES_NAMES.Home}>
        <MainButton width='full' className={classes.empty__btn}>Go Home</MainButton>
      </Link>
    </div>
  )
}

export default EmptyList