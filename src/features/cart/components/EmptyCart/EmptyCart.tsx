import EmptyCartIcon from '@/assets/img/empty-cart.png';
import MainButton from '@/components/ui/Buttons/MainButton/MainButton';
import { COMMON_ROUTES_NAMES } from '@/router/common/commonRoutesNames';
import { Link } from 'react-router';
import classes from './EmptyCart.module.scss';
const EmptyCart = () => {
  return (
    <div className={classes.cart__empty}>
      <img src={EmptyCartIcon} alt="empty cart" className={classes.cart__empty_img}/>
      <h3 className={classes.cart__empty_definition}>
        Your cart is Empty!
      </h3>
      <p className={classes.cart__empty_describe}>
        Looks like you haven't added anything to your cart yet. Start shopping to fill it up! Browse through our categories and discover amazing products tailored just for you.
      </p>
      <Link to={COMMON_ROUTES_NAMES.Home}>
        <MainButton width='full' className={classes.cart__empty_btn}>Go Home</MainButton>
      </Link>
    </div>
  )
}

export default EmptyCart