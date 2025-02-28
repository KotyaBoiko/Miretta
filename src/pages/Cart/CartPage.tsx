import DeliveryInfo from "@/features/cart/components/DeliveryInfo/DeliveryInfo";
import classes from "./cartPage.module.scss";
import CartProducts from "@/features/cart/components/CartProducts/CartProducts";
import { useClearCartMutation } from "@/features/cart/API/cartApi";
import MainButton from "@/components/ui/Buttons/MainButton/MainButton";
const CartPage = () => {
  const [clearCart, {}] = useClearCartMutation();

  return (
    <div className={classes.cart}>
      <div className="wrapper">
        <h1 className={classes.cart__title}>Shopping Cart</h1>
        <div className={classes.cart__container}>
          <div className={classes.cart__products}>
            <CartProducts />
          </div>
          <div>
            <DeliveryInfo />
            <MainButton
              action={() => clearCart()}
              width="full"
              className={classes.cart__clear}
            >
              Clear Cart
            </MainButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
