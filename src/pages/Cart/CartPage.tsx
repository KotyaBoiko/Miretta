import DeliveryInfo from '@/features/cart/components/DeliveryInfo/DeliveryInfo';
import classes from './cartPage.module.scss';
const CartPage = () => {
  return (
    <div className={classes.cart}>
      <div className='wrapper'>
        <h1 className={classes.cart__title}>Shopping Cart</h1>
        <DeliveryInfo/>
      </div>
    </div>
  )
}

export default CartPage